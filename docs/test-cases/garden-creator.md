# Gardener - GARDEN CREATOR Test Cases

## Scope

Testing the garden planning tool.

Functionalities covered:

- garden area image upload
- drag and drop plants onto the canvas
- repositioning plants on the canvas
- removing plants from the layout
- exporting the garden plan as an image
- generating a list of plants used in the design

## Endpoints

No dedicated backend API endpoints - functionality is handled on the frontend (canvas operations, image export via browser APIs).

---

## Test Environment

- Frontend: `npm run build` + `npm run preview`
- Backend: `cd backend` + `npm run dev`
- Database: MongoDB Cloud
- Browser: Chromium

---

## Test Data Reference

### User Accounts

| Label | Email | Password |
|---|---|---|
| Logged-in user | `testuser1@gardener.test` | `TestPass123!` |

### Image Files

| Label | Filename | Format | Size |
|---|---|---|---|
| Valid image - PNG | `garden.png` | PNG | < 5MB |
| Valid image - JPG | `garden.jpg` | JPG/JPEG | < 5MB |
| Invalid format - text | `document.txt` | TXT | any |
| Invalid format - PDF | `document.pdf` | PDF | any |
| Large image | `garden-large.png` | PNG | > 10MB |

### Plant Items (from sidebar / GET /plants)

| Label | Value | Notes |
|---|---|---|
| Plant A | `696eb7a86b37e1e5e232a7b0` - Hosta (Funkia) | Confirmed in DB |
| Plant B | `696eb7a86b37e1e5e232a7b4` - Piwonia chińska (Paeonia lactiflora) | Confirmed in DB |
| Plant C | `696eb7a86b37e1e5e232a7b9` - Melisa lekarska (Melissa officinalis) | Confirmed in DB |

---

## Test Cases

| ID | Title | Objective | Preconditions | Test Steps | Test Data | Expected Result | Actual Result | Postconditions | Status | Severity | Related Scenario | Automation Ready |
|----|-------|-----------|---------------|------------|-----------|----------------|---------------|----------------|--------|---------|-----------------|-----------------|
| GC-01 | Upload valid PNG garden image | Verify user can upload a PNG garden photo | Logged in as testuser1, Garden Creator page open | 1. Click the "Upload image" button 2. Select `garden.png` from file system 3. Confirm selection | `garden.png` (valid PNG, <5MB) | Image successfully uploaded and displayed as the garden canvas background; no error message | TBD | Garden image visible on canvas | Not executed | Major | SC-GC-01 | Yes |
| GC-02 | Upload valid JPG garden image | Verify user can upload a JPG garden photo | Logged in as testuser1, Garden Creator page open | 1. Click the "Upload image" button 2. Select `garden.jpg` from file system 3. Confirm selection | `garden.jpg` (valid JPG, <5MB) | Image successfully uploaded and displayed as the garden canvas background; no error message | TBD | Garden image visible on canvas | Not executed | Major | SC-GC-01 | Yes |
| GC-03 | Upload invalid file format - TXT | Verify system rejects unsupported file types | Logged in as testuser1, Garden Creator page open | 1. Click the "Upload image" button 2. Select `document.txt` from file system | `document.txt` | Upload rejected, validation message displayed (e.g. "Unsupported file format"), no image loaded on canvas | TBD | No image on canvas | Not executed | Minor | SC-GC-02 | Yes |
| GC-04 | Upload invalid file format - PDF | Verify system rejects PDF files | Logged in as testuser1, Garden Creator page open | 1. Click the "Upload image" button 2. Select `document.pdf` from file system | `document.pdf` | Upload rejected, validation message displayed, no image loaded on canvas | TBD | No image on canvas | Not executed | Minor | SC-GC-02 | Yes |
| GC-05 | Upload large image file (>10MB) | Verify system handles oversized image uploads | Logged in as testuser1, Garden Creator page open | 1. Click the "Upload image" button 2. Select `garden-large.png` (>10MB) from file system | `garden-large.png` (>10MB) | Either: image uploaded and displayed successfully OR clear validation error shown (e.g. "File size exceeds limit"); no silent failure | TBD | Canvas shows image or no image depending on outcome | Not executed | Minor | SC-GC-01 | No |
| GC-06 | Drag single plant onto canvas | Verify plant can be placed on garden canvas | Garden image uploaded on canvas, plant list visible in sidebar | 1. Locate a plant item in the sidebar 2. Drag the plant item onto the canvas 3. Release the drag | any plant from sidebar | Plant icon/image appears on the canvas at the drop position | TBD | Plant placed on garden layout | Not executed | Major | SC-GC-03 | Yes |
| GC-07 | Drag multiple plants onto canvas | Verify multiple plants can be added to layout | Garden image uploaded on canvas | 1. Drag plant A onto canvas 2. Drag plant B onto canvas 3. Drag plant C onto canvas | 3 different plants from sidebar | All 3 plants appear on canvas at their respective drop positions | TBD | 3 plants visible on layout | Not executed | Major | SC-GC-06 | Yes |
| GC-08 | Move plant to new position on canvas | Verify plant can be repositioned on canvas | At least 1 plant placed on canvas | 1. Click and hold the placed plant 2. Drag it to a new position on the canvas 3. Release | none | Plant appears at the new position; previous position is cleared | TBD | Plant at new location | Not executed | Major | SC-GC-05 | Yes |
| GC-09 | Remove plant from canvas | Verify plant can be deleted from garden layout | At least 1 plant placed on canvas | 1. Select the placed plant (click on it) 2. Click the "Remove" / delete button or press Delete key | none | Plant is removed from the canvas; no other plants are affected | TBD | Plant removed from layout | Not executed | Major | SC-GC-04 | Yes |
| GC-10 | Export garden plan with plants | Verify garden layout can be exported as image | At least 1 plant placed on canvas, garden image uploaded | 1. Click the "Export" / "Save as image" button | none | PNG image file is downloaded to user's machine; file contains current canvas content (garden image + plants) | TBD | PNG file generated and downloaded | Not executed | Major | SC-GC-07 | Yes |
| GC-11 | Export empty garden (no plants) | Verify system handles export when no plants placed | Garden image uploaded on canvas, no plants placed | 1. Click the "Export" / "Save as image" button | none | Either: garden image exported without plants OR informational message displayed (e.g. "Add plants before exporting") - no crash or silent failure | TBD | Defined outcome achieved (export or message) | Not executed | Minor | SC-GC-09 | Yes |
| GC-12 | Generate plant list from layout | Verify system generates list of plants used in design | Multiple plants placed on canvas | 1. Click the "Generate plant list" button | none | A list displaying all plants placed on the canvas is generated and shown (or downloaded); list contains correct plant names | TBD | Plant list displayed or exported | Not executed | Major | SC-GC-08 | Yes |
| GC-13 | Generate plant list for empty garden | Verify system handles list generation with no plants | Garden image uploaded, no plants placed | 1. Click the "Generate plant list" button | none | Message displayed indicating no plants are in the layout (e.g. "No plants added yet"); no crash | TBD | No list generated, message shown | Not executed | Minor | SC-GC-08 | Yes |
| GC-14 | Export after multiple layout edits | Verify export reflects final state after edits | Multiple plants placed, some moved, some removed | 1. Add plants A, B, C to canvas 2. Move plant B to a new position 3. Remove plant C 4. Click "Export" | 3 plants (A, B, C) | Exported image shows only plants A and B at their current positions; plant C is not visible | TBD | PNG file matches current canvas state | Not executed | Major | SC-GC-07 | Yes |
| GC-15 | Canvas boundary control | Verify plants cannot be placed outside canvas area | Garden image uploaded, plant selected for placement | 1. Drag a plant beyond the right edge of the canvas 2. Release | none | Plant placement is restricted to the canvas area; plant snaps to canvas boundary or drag is prevented outside canvas | TBD | Plant remains inside canvas bounds | Not executed | Minor | SC-GC-10 | Yes |
| GC-16 | Refresh page with created garden | Verify layout resets after page refresh (no persistence) | Plants placed on canvas | 1. Place plants A, B, C on canvas 2. Refresh the browser page (F5) | none | Canvas resets to empty state - all placed plants are gone; no JavaScript errors in console; upload area visible again | TBD | Canvas empty after refresh | Not executed | Minor | SC-GC-06 | No |
| GC-17 | Large number of plants on canvas | Verify canvas remains usable with many plants | Garden image uploaded | 1. Drag 20 or more plants onto the canvas 2. Attempt to move several of them | 20+ plant items | Canvas remains responsive; plants can be moved without significant lag; no browser errors | TBD | 20+ plants visible on canvas | Not executed | Minor | SC-GC-06 | No |