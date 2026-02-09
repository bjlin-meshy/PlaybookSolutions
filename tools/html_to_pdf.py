#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
将HTML演示文稿转换为PDF文件（每页一张幻灯片）
"""

from bs4 import BeautifulSoup
import os
import re

def clean_html_for_pdf(html_content, lang='cn'):
    """清理HTML内容，准备转换为PDF"""
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # 设置语言
    body = soup.find('body')
    if body:
        if lang == 'cn':
            body['class'] = 'lang-cn'
        else:
            body['class'] = 'lang-en'
    
    # 移除控制按钮
    controls = soup.find_all(['div'], class_=['controls', 'control-group-left'])
    for ctrl in controls:
        ctrl.decompose()
    
    # 移除进度条
    progress = soup.find('div', id='progress')
    if progress:
        progress.decompose()
    
    # 移除背景光效（可能影响PDF渲染）
    bg_glow = soup.find('div', class_='bg-glow')
    if bg_glow:
        bg_glow.decompose()
    
    # 修改样式，确保所有幻灯片都可见
    style_tag = soup.find('style')
    if style_tag:
        style_text = style_tag.string or ''
        # 修改.slide样式，让所有幻灯片都显示
        style_text = re.sub(
            r'\.slide\s*\{[^}]*\}',
            '''.slide {
            position: relative !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: scale(1) !important;
            filter: blur(0) !important;
            display: flex;
            flex-direction: column;
            justify-content: center;
            page-break-after: always;
            width: 1280px;
            height: 720px;
            padding: 60px 80px;
            margin: 0;
            box-sizing: border-box;
        }''',
            style_text,
            flags=re.DOTALL
        )
        
        # 移除过渡效果
        style_text = re.sub(r'transition[^;]*;', '', style_text)
        style_text = re.sub(r'\.slide\.active[^}]*\}', '', style_text)
        
        style_tag.string = style_text
    
    # 修改deck-container样式
    deck_container = soup.find('div', id='deck-container')
    if deck_container:
        deck_container['style'] = 'width: 1280px; height: auto; position: relative; background: #080808;'
    
    # 确保所有幻灯片都显示
    slides = soup.find_all('div', class_='slide')
    for slide in slides:
        slide['class'] = ['slide', 'active']
        # 移除动画类
        for anim_el in slide.find_all(class_=re.compile('anim-el|delay')):
            for cls in ['anim-el', 'delay-1', 'delay-2', 'delay-3', 'delay-4']:
                if cls in anim_el.get('class', []):
                    anim_el['class'] = [c for c in anim_el.get('class', []) if c != cls]
    
    return str(soup)

def create_pdf_with_weasyprint(html_file, output_file, lang='cn'):
    """使用WeasyPrint创建PDF"""
    try:
        from weasyprint import HTML, CSS
        from weasyprint.text.fonts import FontConfiguration
        
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # 清理HTML
        cleaned_html = clean_html_for_pdf(html_content, lang)
        
        # 创建PDF
        html_doc = HTML(string=cleaned_html, base_url=os.path.dirname(html_file))
        
        # 添加页面样式
        css = CSS(string='''
            @page {
                size: 1280px 720px;
                margin: 0;
            }
            body {
                margin: 0;
                padding: 0;
            }
            .slide {
                page-break-after: always;
                page-break-inside: avoid;
            }
        ''')
        
        html_doc.write_pdf(output_file, stylesheets=[css])
        return True
    except Exception as e:
        print(f"WeasyPrint错误: {e}")
        return False

def create_pdf_with_playwright(html_file, output_file, lang='cn'):
    """使用Playwright创建PDF（备用方案）"""
    try:
        from playwright.sync_api import sync_playwright
        
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # 清理HTML
        cleaned_html = clean_html_for_pdf(html_content, lang)
        
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page()
            
            # 设置视口大小
            page.set_viewport_size({"width": 1280, "height": 720})
            
            # 加载HTML内容
            page.set_content(cleaned_html, wait_until='networkidle')
            
            # 生成PDF
            page.pdf(
                path=output_file,
                width='1280px',
                height='720px',
                print_background=True,
                margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'}
            )
            
            browser.close()
        return True
    except Exception as e:
        print(f"Playwright错误: {e}")
        return False

def create_pdf_slides_separate(html_file, output_dir, lang='cn'):
    """为每个幻灯片创建单独的PDF页面"""
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    soup = BeautifulSoup(html_content, 'html.parser')
    slides = soup.find_all('div', class_='slide')
    
    # 获取原始样式
    style_tag = soup.find('style')
    original_styles = style_tag.string if style_tag else ''
    
    # 创建输出目录
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"找到 {len(slides)} 个幻灯片")
    
    for i, slide in enumerate(slides):
        print(f"正在处理第 {i+1}/{len(slides)} 个幻灯片...")
        
        # 创建单页HTML
        single_slide_html = f'''<!DOCTYPE html>
<html lang="{'zh-CN' if lang == 'cn' else 'en'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slide {i+1}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&family=Urbanist:wght@400;500;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        {original_styles}
        
        body {{
            background-color: #000000;
            margin: 0;
            padding: 0;
            font-family: {'Noto Sans SC' if lang == 'cn' else 'Inter'}, sans-serif;
            overflow: hidden;
        }}
        
        body.lang-{lang} {{
            font-family: {'Noto Sans SC' if lang == 'cn' else 'Inter'}, sans-serif;
        }}
        
        .cn {{ display: {'inline' if lang == 'cn' else 'none'}; }}
        .en {{ display: {'none' if lang == 'cn' else 'inline'}; }}
        div.cn, p.cn, ul.cn {{ display: {'block' if lang == 'cn' else 'none'}; }}
        div.en, p.en, ul.en {{ display: {'none' if lang == 'cn' else 'block'}; }}
        
        #deck-container {{
            width: 1280px;
            height: 720px;
            position: relative;
            background: #080808;
            margin: 0 auto;
        }}
        
        .slide {{
            position: relative;
            width: 100%;
            height: 100%;
            padding: 60px 80px;
            opacity: 1;
            visibility: visible;
            transform: scale(1);
            filter: blur(0);
            display: flex;
            flex-direction: column;
            justify-content: center;
        }}
        
        .slide .anim-el {{
            opacity: 1;
            transform: translateY(0);
        }}
        
        .bg-glow {{
            display: none;
        }}
    </style>
</head>
<body class="lang-{lang}">
    <div id="deck-container">
        {str(slide)}
    </div>
</body>
</html>'''
        
        # 保存临时HTML文件
        temp_html = os.path.join(output_dir, f'slide_{i+1:02d}.html')
        with open(temp_html, 'w', encoding='utf-8') as f:
            f.write(single_slide_html)
        
        # 转换为PDF
        pdf_file = os.path.join(output_dir, f'slide_{i+1:02d}.pdf')
        
        # 尝试使用WeasyPrint
        if create_pdf_with_weasyprint(temp_html, pdf_file, lang):
            os.remove(temp_html)  # 删除临时HTML
            continue
        
        # 如果WeasyPrint失败，尝试Playwright
        try:
            from playwright.sync_api import sync_playwright
            if create_pdf_with_playwright(temp_html, pdf_file, lang):
                os.remove(temp_html)
                continue
        except:
            pass
        
        print(f"警告: 幻灯片 {i+1} 转换失败，已保存HTML文件: {temp_html}")

def merge_pdfs(pdf_files, output_file):
    """合并多个PDF文件"""
    try:
        from PyPDF2 import PdfMerger
        merger = PdfMerger()
        for pdf in pdf_files:
            if os.path.exists(pdf):
                merger.append(pdf)
        merger.write(output_file)
        merger.close()
        return True
    except Exception as e:
        print(f"合并PDF错误: {e}")
        return False

def convert_html_to_pdf(html_file, output_file, lang='cn'):
    """将HTML文件转换为PDF"""
    # 创建临时目录
    temp_dir = os.path.join(os.path.dirname(output_file), 'temp_pdf_slides')
    os.makedirs(temp_dir, exist_ok=True)
    
    try:
        # 为每个幻灯片创建单独的PDF
        create_pdf_slides_separate(html_file, temp_dir, lang)
        
        # 收集所有PDF文件
        pdf_files = []
        for i in range(1, 28):  # 27个幻灯片
            pdf_path = os.path.join(temp_dir, f'slide_{i:02d}.pdf')
            if os.path.exists(pdf_path):
                pdf_files.append(pdf_path)
        
        # 合并PDF
        if pdf_files:
            # 安装PyPDF2用于合并
            try:
                import PyPDF2
            except:
                print("正在安装PyPDF2用于合并PDF...")
                os.system('python -m pip install PyPDF2 --quiet')
            
            if merge_pdfs(sorted(pdf_files), output_file):
                print(f"[OK] 已保存到: {output_file}")
            else:
                print(f"[警告] PDF合并失败，但单独的PDF文件已保存在: {temp_dir}")
        else:
            print("[错误] 没有成功生成PDF文件")
    
    finally:
        # 清理临时文件（可选）
        # import shutil
        # shutil.rmtree(temp_dir, ignore_errors=True)
        pass

if __name__ == '__main__':
    html_file = r'd:\2026\0125_PlaybookS\PPT.html'
    output_file_cn = r'd:\2026\0125_PlaybookS\PPT_CN.pdf'
    output_file_en = r'd:\2026\0125_PlaybookS\PPT_EN.pdf'
    
    print("=" * 50)
    print("HTML 转 PDF 转换工具")
    print("=" * 50)
    
    # 尝试安装playwright作为备用
    try:
        import playwright
    except:
        print("正在安装Playwright作为备用方案...")
        os.system('python -m pip install playwright --quiet')
        os.system('python -m playwright install chromium')
    
    print("\n正在转换为中文版PDF...")
    convert_html_to_pdf(html_file, output_file_cn, lang='cn')
    
    print("\n正在转换为英文版PDF...")
    convert_html_to_pdf(html_file, output_file_en, lang='en')
    
    print("\n" + "=" * 50)
    print("转换完成！")
    print("=" * 50)
