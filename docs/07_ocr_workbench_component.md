# FALO OCR Workbench Component Design

## 1. Core Positioning

FALO OCR Workbench is an independent data-conversion component hosted outside this Prompt Manager package.

It is not a side panel inside FALO Prompt Manager, and it is no longer maintained as a local `ocr.html` in this package. Prompt Manager opens the public OCR tool:

```text
https://falo-taiwan.github.io/ai-ocr-demo/
```

Short version:

> Prompt Manager manages Prompt Assets.  
> OCR Workbench turns images into editable text.  
> The current integration is: Prompt Manager opens the external OCR Workbench URL.

## 2. Product Boundary

### FALO Prompt Manager `index.html`

The main page should only keep:

- OCR entry button
- Short explanation

It should not contain:

- Gemini API key field
- OCR prompt template editor
- OCR result editor
- OCR template import/export
- image upload UI

### FALO OCR Workbench External Page

The external OCR page owns:

- image/file input
- image preview
- OCR operation prompt selection
- editable OCR operation prompt
- OCR result text area
- copy result button
- OCR prompt template import/export
- restore default template button
- its own PWA/install behavior

## 3. OCR Prompt Meaning

OCR Prompt here means the operation prompt sent together with the image.

It is not an OCR post-processing prompt.

The mental model is:

```text
image / screenshot / handwritten note
        +
OCR operation prompt
        ↓
Gemini OCR or external OCR tool
        ↓
editable text result
        ↓
copy back to Prompt Manager or other workflow
```

In v0.3, Gemini OCR execution is still reserved. The UI teaches and prepares the structure, but does not yet consume API credits.

## 4. Default OCR Operation Prompts

The first version should provide five built-in templates:

1. General document OCR
2. Table / form OCR
3. Handwritten note OCR
4. Historical document OCR
5. Receipt / evidence OCR

These prompts should control how the OCR model reads the image:

- preserve layout or not
- mark uncertain text
- extract table structure
- avoid hallucinating missing content
- output plain text or JSON-like structure

## 5. Output Behavior

OCR output should be simple:

- one large editable text area
- copy result button
- optional clear button

The first version should not build a complex post-processing workflow. Users can copy the result back to Prompt Manager, ChatGPT, Gemini, NotebookLM, or another FALO tool.

## 6. Template Import / Export: Excel Mode

OCR prompt templates should use an Excel-friendly table format.

Recommended CSV columns:

```text
id,title,description,prompt,outputFormat,useCase,status
```

Workflow:

```text
Export CSV template
    ↓
Edit in Excel / Google Sheets
    ↓
Import CSV
    ↓
Full overwrite OCR template list
```

This is intentionally a full overwrite loop, not a merge system.

Why:

- easier to teach
- easier to audit
- avoids complex conflict resolution
- matches spreadsheet thinking

## 7. PWA Strategy

The OCR Workbench should be installable as its own lightweight PWA, but that responsibility belongs to the external OCR project, not this Prompt Manager package.

For v0.3:

- Prompt Manager keeps only an OCR entry button and explanation text
- Prompt Manager opens `https://falo-taiwan.github.io/ai-ocr-demo/`
- local `ocr.html` and `ocr-manifest.webmanifest` are removed from this package
- Prompt Manager service worker caches only the Prompt Manager shell

Prompt Manager keeps its own `manifest.webmanifest`.

## 8. Current v0.3 Implementation Scope

Do now in this package:

- keep OCR entry button
- explain OCR is an external data-conversion component
- open `https://falo-taiwan.github.io/ai-ocr-demo/`
- do not ship a local OCR HTML/PWA

Do not do in this package:

- local OCR API call
- local OCR template editor
- local Gemini API key field
- local OCR result editor
- local OCR PWA manifest

## 9. Teaching Sentence

> OCR Workbench is an external FALO data-conversion component: Prompt Manager links to it instead of embedding OCR logic locally.
