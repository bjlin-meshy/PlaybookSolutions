#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
将HTML演示文稿转换为PDF文件（每页一张幻灯片）
使用Playwright渲染
"""

from bs4 import BeautifulSoup
import os
import re

def prepare_html_for_pdf(html_file, lang='cn'):
    """准备HTML内容用于PDF转换"""
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # 设置语言
    body = soup.find('body')
    if body:
        body['class'] = f'lang-{lang}'
    
    # 移除控制按钮和进度条
    for elem in soup.find_all(['div'], class_=['controls', 'control-group-left']):
        elem.decompose()
    
    progress = soup.find('div', id='progress')
    if progress:
        progress.decompose()
    
    bg_glow = soup.find('div', class_='bg-glow')
    if bg_glow:
        bg_glow.decompose()
    
    # 修改样式，让所有幻灯片都显示
    style_tag = soup.find('style')
    if style_tag:
        style_text = style_tag.string or ''
        
        # 添加PDF专用样式
        pdf_styles = '''
        /* PDF专用样式 */
        @page {
            size: 1280px 720px;
            margin: 0;
        }
        
        body {
            margin: 0;
            padding: 0;
            background: #000000;
        }
        
        #deck-container {
            width: 1280px;
            height: auto;
            position: relative;
            background: #080808;
            margin: 0;
        }
        
        .slide {
            position: relative !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: scale(1) !important;
            filter: blur(0) !important;
            display: flex !important;
            flex-direction: column;
            justify-content: center;
            width: 1280px;
            height: 720px;
            padding: 60px 80px;
            margin: 0;
            page-break-after: always;
            page-break-inside: avoid;
            box-sizing: border-box;
        }
        
        .slide:last-child {
            page-break-after: auto;
        }
        
        .slide .anim-el {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .bg-glow {
            display: none !important;
        }
        '''
        
        style_tag.string = style_text + pdf_styles
    
    # 确保所有幻灯片都显示
    slides = soup.find_all('div', class_='slide')
    for slide in slides:
        slide['class'] = ['slide']
        # 移除动画延迟类
        for elem in slide.find_all(class_=True):
            classes = elem.get('class', [])
            new_classes = [c for c in classes if not c.startswith('delay-') and c != 'anim-el']
            if new_classes != classes:
                elem['class'] = new_classes
    
    # 修改deck-container
    deck_container = soup.find('div', id='deck-container')
    if deck_container:
        deck_container['style'] = 'width: 1280px; height: auto; position: relative; background: #080808;'
    
    return str(soup)

def convert_to_pdf_playwright(html_content, output_file):
    """使用Playwright将HTML转换为PDF"""
    try:
        from playwright.sync_api import sync_playwright
        
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            
            # 设置视口
            page.set_viewport_size({"width": 1280, "height": 720})
            
            # 加载HTML
            page.set_content(html_content, wait_until='networkidle')
            
            # 等待字体加载
            page.wait_for_timeout(2000)
            
            # 生成PDF
            page.pdf(
                path=output_file,
                width='1280px',
                height='720px',
                print_background=True,
                margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'},
                prefer_css_page_size=True
            )
            
            browser.close()
        return True
    except Exception as e:
        print(f"Playwright转换错误: {e}")
        return False

def convert_html_to_pdf(html_file, output_file, lang='cn'):
    """将HTML文件转换为PDF"""
    print(f"正在准备HTML内容（{lang}）...")
    html_content = prepare_html_for_pdf(html_file, lang)
    
    print("正在转换为PDF...")
    if convert_to_pdf_playwright(html_content, output_file):
        print(f"[OK] 已保存到: {output_file}")
        return True
    else:
        print(f"[错误] PDF转换失败")
        return False

if __name__ == '__main__':
    html_file = r'd:\2026\0125_PlaybookS\PPT.html'
    output_file_cn = r'd:\2026\0125_PlaybookS\PPT_CN.pdf'
    output_file_en = r'd:\2026\0125_PlaybookS\PPT_EN.pdf'
    
    print("=" * 50)
    print("HTML 转 PDF 转换工具")
    print("=" * 50)
    
    # 检查并安装playwright
    try:
        from playwright.sync_api import sync_playwright
        print("Playwright已安装")
    except:
        print("正在安装Playwright...")
        os.system('python -m pip install playwright --quiet')
        print("正在安装Chromium浏览器...")
        os.system('python -m playwright install chromium')
    
    print("\n正在转换为中文版PDF...")
    convert_html_to_pdf(html_file, output_file_cn, lang='cn')
    
    print("\n正在转换为英文版PDF...")
    convert_html_to_pdf(html_file, output_file_en, lang='en')
    
    print("\n" + "=" * 50)
    print("转换完成！")
    print("=" * 50)
