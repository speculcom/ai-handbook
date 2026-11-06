"""Deterministic, fictional teaching fixtures. No OCR/ASR/product run implied."""
from pathlib import Path
import csv, io, json, hashlib, subprocess, shutil
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.platypus import Table, TableStyle, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from PIL import Image
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'samples'
PDF = ROOT.parents[2] / 'output' / 'pdf'
TMP = ROOT.parents[2] / 'tmp' / 'pdfs'
for p in [OUT, PDF, TMP]: p.mkdir(parents=True, exist_ok=True)
def write(name, content):
    (OUT/name).parent.mkdir(parents=True, exist_ok=True)
    (OUT/name).write_text(content, encoding='utf-8', newline='')
def csvfile(name, rows):
    s = io.StringIO(newline=''); csv.writer(s, lineterminator='\n').writerows(rows); write(name,s.getvalue())

# The reference is defined first, not extracted by an OCR engine.
csvfile('pdf-table/reference.csv',[
 ['item_id','description','quantity','unit_price','currency','line_amount','page','source_row','status'],
 ['001','Notebook, dotted',2,'12.50','CNY','25.00',1,1,'complete'],
 ['002','Folder - blue',3,'4.00','CNY','12.00',1,2,'complete'],
 ['003','Label rolls',1,'','CNY','',1,3,'unit_price_missing']])
write('pdf-table/checks.txt', 'Fictional exercise; reference.csv is a designed answer, not OCR output.\n3 item rows; item IDs remain 001/002/003.\nKnown line amounts sum to CNY 37.00. This is NOT a payable total: row 003 has no price and tax/shipping are unspecified.\nDo not infer a zero price, a missing total, or a tax rate. Preserve page/row evidence.\n')
text_pdf = PDF/'fictional-order-text.pdf'
c = canvas.Canvas(str(text_pdf), pagesize=A4, invariant=1)
w,h=A4
c.setTitle('Fictional order - teaching input')
c.setFillColor(colors.HexColor('#224d57')); c.rect(0,h-120,w,120,fill=1,stroke=0)
c.setFillColor(colors.white); c.setFont('Helvetica-Bold',22); c.drawString(42,h-59,'A small order, three source rows')
c.setFont('Helvetica',11); c.drawString(42,h-84,'FICTIONAL TEACHING INPUT - NOT A REAL INVOICE')
c.setFillColor(colors.HexColor('#25383c')); c.setFont('Helvetica',11)
c.drawString(42,h-154,'Order: DEMO-2026-1104     Currency: CNY     Page: 1 of 1')
c.drawString(42,h-176,'Blank price means not provided. Tax and shipping are not specified.')
styles=getSampleStyleSheet()
rows=[['Item ID','Description','Quantity','Unit price','Line amount'],
      ['001',Paragraph('Notebook,<br/>dotted',styles['BodyText']),'2','12.50','25.00'],
      ['002','Folder - blue','3','4.00','12.00'],['003','Label rolls','1','','']]
t=Table(rows,colWidths=[59,170,66,93,123],rowHeights=[34,50,44,44])
t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#e6eeee')),('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),('FONTSIZE',(0,0),(-1,-1),10),('VALIGN',(0,0),(-1,-1),'MIDDLE'),('LEFTPADDING',(0,0),(-1,-1),9),('GRID',(0,0),(-1,-1),0.5,colors.HexColor('#9db3b7')),('ALIGN',(2,1),(-1,-1),'RIGHT')]))
t.wrapOn(c,w,h); t.drawOn(c,42,h-375)
c.setFont('Helvetica-Bold',12); c.drawString(42,h-411,'Known amounts only: CNY 37.00')
c.setFont('Helvetica',10)
for i,line in enumerate(['This is not the payable total: row 003 is incomplete.', 'Check every row against the source page, including the blank cells.', 'The wrapped description in row 001 belongs to one item, not two.']): c.drawString(42,h-435-i*19,line)
c.setStrokeColor(colors.HexColor('#9db3b7')); c.line(42,68,w-42,68)
c.setFont('Helvetica',9); c.drawString(42,49,'Specul teaching sample | CC BY 4.0 | Original synthetic content | 2026-11-04')
c.save()
poppler=shutil.which('pdftoppm')
if not poppler: raise RuntimeError('pdftoppm required for visual QA and scan input')
subprocess.run([poppler,'-r','160','-singlefile','-png',str(text_pdf),str(TMP/'fictional-order')],check=True)
png=TMP/'fictional-order.png'
scan_pdf=PDF/'fictional-order-scan.pdf'
im=Image.open(png).convert('RGB'); im.save(scan_pdf,'PDF',resolution=160)
assert len(PdfReader(text_pdf).pages)==1 and 'Notebook' in PdfReader(text_pdf).pages[0].extract_text()
assert len(PdfReader(scan_pdf).pages)==1 and not PdfReader(scan_pdf).pages[0].extract_text().strip()
for p in [text_pdf,scan_pdf]: shutil.copyfile(p,OUT/'pdf-table'/p.name)
subprocess.run([poppler,'-r','110','-singlefile','-png',str(scan_pdf),str(TMP/'fictional-order-scan-review')],check=True)

csvfile('merge/customers.csv',[
 ['customer_id','customer_name'],['001','Willow Studio'],['002','Harbor Works'],['003','Field Office']])
csvfile('merge/orders-a.csv',[
 ['order_id','customer_id','amount_cny','order_date'],['A01','001','25.00','2026-11-01'],['A02','002','12.00','2026-11-02'],['A03','003','8.00','03/11/2026']])
csvfile('merge/orders-b.csv',[
 ['order_id','customer_id','amount_cny','order_date'],['A02','002','12.00','2026-11-02'],['A03','003','9.00','03/11/2026'],['A04','009','5.00','2026-11-04']])
csvfile('merge/reference-clean.csv',[
 ['order_id','customer_id','customer_name','amount_cny','order_date','source_rows'],
 ['A01','001','Willow Studio','25.00','2026-11-01','orders-a.csv:2'],
 ['A02','002','Harbor Works','12.00','2026-11-02','orders-a.csv:3;orders-b.csv:2']])
csvfile('merge/reference-exceptions.csv',[
 ['order_id','reason','source_rows','resolution'],
 ['A03','amount_conflict;ambiguous_date','orders-a.csv:4;orders-b.csv:3','needs_source_confirmation'],
 ['A04','unmatched_customer_id','orders-b.csv:4','needs_customer_mapping']])
write('merge/checks.txt','Fictional teaching data. Keep source files unchanged.\n6 order input rows -> 4 distinct order IDs -> 2 accepted orders + 2 exception IDs. A02 repeats exactly and counts once.\nAccepted amount CNY 37.00; excluded amounts are not zero and must not enter the accepted subtotal.\nA03 has 8.00/9.00 conflict and ambiguous 03/11/2026. Do not choose a locale or newer file without an explicit rule. A04 customer 009 is unmapped.\n')

write('review/policy-v1.md','# Fictional equipment loan policy v1\n\nNot a real company policy or legal document.\n\n## P1 Scope\nApplies to demonstration devices borrowed from the Field Lab.\n\n## P2 Duration\nA loan lasts 14 calendar days.\n\n## P3 Approval\nThe lab coordinator approves an extension before the original return date.\n\n## P4 Charges\nThere is no charge for a loan under this demonstration policy.\n\n## P5 Logs\nThe return log stores device ID and return date for 30 days.\n')
write('review/policy-v2.md','# Fictional equipment loan policy v2 - DRAFT\n\nNot a real company policy or legal document.\n\n## P1 Scope\nApplies to demonstration devices borrowed from the Field Lab.\n\n## P2 Duration\nA loan lasts 10 business days.\n\n## P3 Approval\nExtensions do not require coordinator approval unless the loan has not been returned on time.\n\n## P4 Charges\nThere is no charge for a loan under this demonstration policy.\n\n## P5 Logs\nThe return log stores device ID and return date for 60 days.\n\n## P6 Summary\nSummary for borrowers: maximum loan period is two weeks; the log is removed after 30 days.\n')
csvfile('review/reference-findings.csv',[
 ['finding_id','v1_location','v2_location','type','observation','question'],
 ['F01','P2','P2;P6','unit_change_and_ambiguity','14 calendar days -> 10 business days; P6 says two weeks','Which calendar and holidays apply; what does two weeks mean?'],
 ['F02','P3','P3','approval_rule_change','Approval exception depends on late return; wording has nested negation','Is extension before the due date approval-free; who approves after it?'],
 ['F03','P5','P5;P6','internal_conflict','P5 says 60 days; P6 says 30 days','Which retention period controls; who corrects P6?']])
write('review/reference-summary.md','# Reference review, not a final policy\n\nFictional teaching example; no legal judgement.\n\n- P1 and P4 are unchanged. Do not invent changes to scope or charges.\n- F01: duration uses a different unit. A calendar and holiday rule are needed before claiming it is longer or shorter. P6 is ambiguous.\n- F02: extension approval changed. Keep both full clauses and ask the author to confirm the exception; do not silently rewrite it as an approved rule.\n- F03: v2 contradicts itself: P5 60 days, P6 30 days. No final period can be selected from this draft.\n\nDisposition: return the three questions to a fictional policy owner. Do not publish v2 as settled. The CSV is a designed reference, not a model evaluation.\n')

turns=[('Mina','The practice meeting is on November fourth, twenty twenty-six, in Shanghai time. The sample site release is still a proposal, not an approval.'),
       ('Leo','I will check the download links by November sixth. I have not checked them yet.'),
       ('Mina','Agreed. Leo owns the link check, due November sixth. If it fails, we postpone the release.'),
       ('Jo','I suggest adding subtitles. I cannot take ownership this week. We have no owner or deadline for subtitles.'),
       ('Mina','We have not approved a release date or budget. Record subtitles as a proposal. Do not write either item as completed.')]
write('meeting/script.txt','FICTIONAL SYNTHETIC SPEECH SCRIPT - NOT AN ASR TRANSCRIPT\nMeeting anchor: 2026-11-04, Asia/Shanghai.\nSpeaker names are spoken labels by one synthetic voice; this does not test speaker diarization.\n\n'+'\n\n'.join(f'T{i+1} {name}: {line}' for i,(name,line) in enumerate(turns))+'\n')
write('meeting/tts-input.txt','\n'.join(f'{name} says. {line}' for name,line in turns))
csvfile('meeting/reference-actions.csv',[
 ['item_id','item','status','owner','due_date','timezone','evidence','condition'],
 ['M01','Check download links','agreed_not_started','Leo','2026-11-06','Asia/Shanghai','T2;T3','postpone release if check fails'],
 ['M02','Add subtitles','proposed','','','','T4;T5','no owner or deadline agreed'],
 ['M03','Release site','not_approved','','','','T1;T5','release date and budget not approved']])
write('meeting/reference-notes.md','# Reference notes\n\nFictional meeting; audio is one synthetic voice with spoken role labels. This reference was designed from the script, not produced by speech recognition.\n\nAnchor: 2026-11-04, Asia/Shanghai.\n\nDecision: Leo checks download links by 2026-11-06; if the check fails, postpone the proposed release (T2-T3). Work is not complete.\n\nProposal: subtitles (T4-T5). No owner or deadline. Jo explicitly cannot take ownership this week.\n\nUnresolved: release date and budget have not been approved (T1, T5). Do not turn a proposal into an approved release.\n\nTo verify: replay each item, preserve a time interval from your transcription tool, and compare status, names, negation, deadline and condition. Turn IDs in this reference are script locators, not audio timestamps.\n')
print(json.dumps({'sample_root':str(OUT),'pdfs':[str(text_pdf),str(scan_pdf)],'review_pngs':[str(png),str(TMP/'fictional-order-scan-review.png')]}))
