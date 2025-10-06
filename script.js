/* ============================================================================
   GLYPHTRIX - JAVASCRIPT
   ============================================================================
   
   Table of Contents:
   1. UTILITY FUNCTIONS
   2. CHARACTER SET CONFIGURATION
   3. DOM ELEMENT REFERENCES
      3.1 Canvas & Media Elements
      3.2 Image Settings Controls
      3.3 Glyph/Font Settings Controls
      3.4 Output Settings Controls
      3.5 Button & Action Elements
      3.6 Layout & Panel Elements
   4. STATE MANAGEMENT VARIABLES
   5. CONFIGURATION - FONTS & CONSTANTS
   6. HISTORY & UNDO/REDO SYSTEM
   7. FILE UPLOAD & LOADING
   8. IMAGE PROCESSING FUNCTIONS
   9. ASCII RENDERING ENGINE
   10. VIDEO PROCESSING
   11. EXPORT FUNCTIONS
   12. UI EVENT HANDLERS
   13. MOBILE SUPPORT
   14. INITIALIZATION & EVENT LISTENERS
   
   ============================================================================ */


/* ============================================================================
   1. UTILITY FUNCTIONS
   ============================================================================ */

// Global spinner SVG generator
function getSpinner(size = 24) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24"><g><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".14"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".29" transform="rotate(30 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".43" transform="rotate(60 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".57" transform="rotate(90 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".71" transform="rotate(120 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".86" transform="rotate(150 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" transform="rotate(180 12 12)"/><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"/></g></svg>`;
}


/* ============================================================================
   2. CHARACTER SET CONFIGURATION
   ============================================================================ */

let randomNumberMap = {};
const numbersChars = "0123456789";
const latinBasicChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const latinChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ";
const cyrillicChars = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя";
const devanagariChars = "अआइईउऊऋॠऌएऐओऔअंअःकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहक़ख़ग़ज़ड़ढ़फ़य़ऴक्षत्रज्ञािीुूेैोौं";
const thaiChars = "กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะาำิีึืุูเแโใไๅๆ็่้๊๋์";
const japaneseChars = "一あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン日一国会人年大十二本中長出三同時政事自行社見月分議後前民生連五発間対上部東者党地合市業内相方法四定今回新場金員九入選立開手米力学問高代明実円関決子動京全目表戦経通外最言氏現理調体化田当八六約主題下首意法";
const koreanChars = "의가은은이하고는에의한을은도를다지지와과는있사기대에고는도한수시나자일내하는로와는생것있적정면위자이에서들중로서나시로를만아지자에서어는국년시기다리리마게명야";
const chineseChars = "一的是不了人在有我他这中大为上个国到说们时要就出会可也你对生能而子那得于着下自之年过发后作里用道行所然家种事成方多经么去法学如都同现当没动面起看定天分还进好小部其些主样理心她本前开但因只从想实日军者无力它与长把机十民第公此已工使情明性知全三又关点正业外将两高间由问很最重并物手应战向头文体政美相见被利什二等产或新己制身果加西斯月话合回特代内信表化老给世位次度门任常先海通教儿原东声提立及比员解水名真论处走义各入几口认条平系气题活尔更别打女变四神总何电数安少报才结反受目太量再感建务做接必场件计管期市直德资命山金指克许统区保至队形社便空决治展马科司五基眼书非则听白却界达光放强即像难且权思王象完设式色路记南品住告类求据程北边风规解";
const arabicChars = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي";
let customCharSeqIndex = 0;


/* ============================================================================
   3. DOM ELEMENT REFERENCES
   ============================================================================ */

/* 3.1 Canvas & Media Elements */
const imageUpload = document.getElementById('imageUpload');
const condensedImageUpload = document.getElementById('condensedImageUpload');
const inputCanvas = document.getElementById('inputCanvas');
const inputVideo = document.getElementById('inputVideo');
const outputCanvas = document.getElementById('outputCanvas');
const inputCtx = inputCanvas.getContext('2d');
const outputCtx = outputCanvas.getContext('2d');
const loadingSpinner = document.getElementById('loadingSpinner');
const mobileLoadingSpinner = document.getElementById('mobileLoadingSpinner');
const sequenceLoadingOverlay = document.getElementById('sequenceLoadingOverlay');
const sequenceLoadingOverlayText = document.getElementById('sequenceLoadingOverlayText');
const sequenceLoadingMessage = document.getElementById('sequenceLoadingMessage');
const cancelSequenceButton = document.getElementById('cancelSequenceButton');


const condensedUploadZone = document.getElementById('condensedUploadZone');
const condensedFilename = document.getElementById('condensedFilename');
const uploadPanelTitle = document.getElementById('uploadPanelTitle');

/* 3.2 Image Settings Controls */
const levelsSlider = document.getElementById('levelsSlider');
const levelsValueDisplay = document.getElementById('levelsValueDisplay');
const brightnessSlider = document.getElementById('brightnessSlider');
const brightnessValueDisplay = document.getElementById('brightnessValueDisplay');
const shadowInputSlider = document.getElementById('shadowInputSlider');
const shadowInputValueDisplay = document.getElementById('shadowInputValueDisplay');
const midtoneGammaSlider = document.getElementById('midtoneGammaSlider');
const midtoneGammaValueDisplay = document.getElementById('midtoneGammaValueDisplay');
const highlightInputSlider = document.getElementById('highlightInputSlider');
const highlightInputValueDisplay = document.getElementById('highlightInputValueDisplay');
const previewChangesToggle = document.getElementById('previewChangesToggle');
const invertColorsToggle = document.getElementById('invertColorsToggle');
const contrastSlider = document.getElementById('contrastSlider');
const contrastSliderContainer = document.getElementById('contrastSliderContainer');
const contrastValueDisplay = document.getElementById('contrastValueDisplay');
const chromaRemovalToggle = document.getElementById('backgroundRemovalToggle');
const chromaRemovalContainer = document.getElementById('backgroundRemovalContainer');
const invertColorsContainer = document.getElementById('invertColorsContainer');
const previewChangesContainer = document.getElementById('previewChangesContainer');

/* 3.3 Glyph/Font Settings Controls */
const densityInput = document.getElementById('densityInput');
const densityDecrement = document.getElementById('densityDecrement');
const densityIncrement = document.getElementById('densityIncrement');
const gridSizeDisplay = document.getElementById('gridSizeDisplay');
const fontSelect = document.getElementById('fontSelect');
const prevFontButton = document.getElementById('prevFontButton');
const nextFontButton = document.getElementById('nextFontButton');
const characterSetSelect = document.getElementById('characterSetSelect');
const prevCharSetButton = document.getElementById('prevCharSetButton');
const nextCharSetButton = document.getElementById('nextCharSetButton');
const customCharsContainer = document.getElementById('customCharsContainer');
const customCharsInput = document.getElementById('customCharsInput');
const customCharsHelpButton = document.getElementById('customCharsHelpButton');

/* 3.4 Output Settings Controls */
const scaleFactorInput = document.getElementById('scaleFactorInput');
const scaleFactorDecrement = document.getElementById('scaleFactorDecrement');
const scaleFactorIncrement = document.getElementById('scaleFactorIncrement');
const outputResolutionDisplay = document.getElementById('outputResolutionDisplay');
const colorSchemeSelect = document.getElementById('colorSchemeSelect');
const prevColorSchemeButton = document.getElementById('prevColorSchemeButton');
const nextColorSchemeButton = document.getElementById('nextColorSchemeButton');

const customColorsContainer = document.getElementById('customColorsContainer');
const customTextColor = document.getElementById('customTextColor');
const customBackgroundColor = document.getElementById('customBackgroundColor');
const transparentBgToggle = document.getElementById('transparentBgToggle');
const charSpacingSlider = document.getElementById('charSpacingSlider');
const charSpacingValueDisplay = document.getElementById('charSpacingValueDisplay');
const randomSpacingToggle = document.getElementById('randomSpacingToggle');

let isBgColorTransparent = false;
let currentCharSpacing = 0;
let isRandomSpacingActive = true;
let columnOffsets = [];

/* 3.5 Button & Action Elements */
const openNewTabButton = document.getElementById('openNewTabButton');
const downloadPngButton = document.getElementById('downloadPngButton');
const downloadTextButton = document.getElementById('downloadTextButton');
const downloadPngSequenceButton = document.getElementById('downloadPngSequenceButton');

/* 3.6 Layout & Panel Elements */
const mainContainer = document.getElementById('mainContainer');
const desktopSettingsPanelContainer = document.getElementById('desktopSettingsPanel');
const mobileSettingsPanel = document.getElementById('mobileSettingsPanel');
const mobileUploadPanelPlaceholder = document.getElementById('mobileUploadPanelPlaceholder');
const mobileDownloadPanelPlaceholder = document.getElementById('mobileDownloadPanelPlaceholder');

const uploadPanelContent = document.getElementById('uploadPanelContent');
const settingsTitleSection = document.getElementById('settingsTitleSection');
const imageSettingsContent = document.getElementById('imageSettingsContent');
const fontSettingsContent = document.getElementById('fontSettingsContent');
const outputSettingsContent = document.getElementById('outputSettingsContent');
const downloadPanelContent = document.getElementById('downloadPanelContent');


/* ============================================================================
   4. STATE MANAGEMENT VARIABLES
   ============================================================================ */

/* Media & Processing State */
let currentBlobMatrix = null;
let currentMediaElement = null;
let originalPixelData = null;

let currentImageOriginalWidth = 0;
let currentImageOriginalHeight = 0;
let isPreviewChangesActive = false;
let isInvertColorsActive = false;
let isChromaRemovalActive = false;
let currentBackgroundTolerance = 10;
let isVideoInput = false;
let videoProcessLoopId = null;

let isSequenceRendering = false;
let cancelSequenceRenderFlag = false;
let cachedZipBlob = null;
let sequenceSettingsSnapshot = null;

let actionHistory = [];
let currentHistoryIndex = -1;
const MAX_HISTORY_SIZE = 100;
let isFileJustLoaded = false;
let sliderChangeTimeout = null;
const SLIDER_DEBOUNCE_DELAY = 500;


/* ============================================================================
   5. CONFIGURATION - FONTS & CONSTANTS
   ============================================================================ */

const availableFonts = [
    { name: 'Courier New', cssName: '"Courier New", Courier, monospace' },
    { name: 'Cutive Mono', cssName: '"Cutive Mono", monospace' },
    { name: 'Source Code Pro', cssName: '"Source Code Pro", monospace' },
    { name: 'Victor Mono', cssName: '"Victor Mono", monospace' },
    { name: 'Workbench', cssName: '"Workbench", monospace' },
    { name: 'Doto', cssName: '"Doto", monospace' },
    { name: 'VT323', cssName: '"VT323", monospace' },
    { name: 'Bytesized', cssName: '"Bytesized", monospace' }
];
let currentFontFamily;

let currentNumLevels, currentBrightness, currentContrast, currentShadowInput,
    currentMidtoneGamma, currentHighlightInput, currentDensity,
    currentScaleFactor, currentColorScheme, currentCharacterSet;

const FIXED_FONT_SIZE = 8;


/* ============================================================================
   6. HISTORY & UNDO/REDO SYSTEM
   ============================================================================ */

function getCurrentSettingsSnapshot(fps) {
    return JSON.stringify({
        levels: levelsSlider.value,
        brightness: brightnessSlider.value,
        contrast: contrastSlider.value,
        shadow: shadowInputSlider.value,
        midtone: midtoneGammaSlider.value,
        highlight: highlightInputSlider.value,
        density: densityInput.value,
        scale: scaleFactorInput.value,
        colorScheme: colorSchemeSelect.value,
        font: fontSelect.value,
        charSet: characterSetSelect.value,
        customChars: customCharsInput.value,
        invert: invertColorsToggle.checked,
        chromaRemoval: chromaRemovalToggle.checked,
        sequenceFps: fps,

        customText: customTextColor.value,
        customBackground: customBackgroundColor.value,
        transparentBg: isBgColorTransparent,
        charSpacing: charSpacingSlider.value,
    });
}

function saveActionToHistory() {
    if (isFileJustLoaded) return;
    
    const currentSettings = getCurrentSettingsSnapshot();
    
    actionHistory = actionHistory.slice(0, currentHistoryIndex + 1);
    
    actionHistory.push(currentSettings);
    
    if (actionHistory.length > MAX_HISTORY_SIZE) {
        actionHistory.shift();
    } else {
        currentHistoryIndex++;
    }
    
    updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
    const undoButton = document.getElementById('undoButton');
    const redoButton = document.getElementById('redoButton');
    
    if (undoButton) undoButton.disabled = currentHistoryIndex <= 0 || isFileJustLoaded;
    if (redoButton) redoButton.disabled = currentHistoryIndex >= actionHistory.length - 1;
}

function initializeHistoryForNewFile() {
    isFileJustLoaded = true;
    actionHistory = [];
    currentHistoryIndex = -1;
    const currentSettings = getCurrentSettingsSnapshot();
    actionHistory.push(currentSettings);
    currentHistoryIndex = 0;
    updateUndoRedoButtons();
    
    if (sliderChangeTimeout) {
        clearTimeout(sliderChangeTimeout);
        sliderChangeTimeout = null;
    }
}

function enableHistoryAfterUserChange() {
    if (isFileJustLoaded) {
        isFileJustLoaded = false;
        updateUndoRedoButtons();
    }
}

function debouncedSaveSliderToHistory() {
    if (sliderChangeTimeout) {
        clearTimeout(sliderChangeTimeout);
    }
    sliderChangeTimeout = setTimeout(() => {
        enableHistoryAfterUserChange();
        saveActionToHistory();
    }, SLIDER_DEBOUNCE_DELAY);
}

function undoAction() {
    if (currentHistoryIndex > 0) {
        currentHistoryIndex--;
        restoreSettingsFromSnapshot(actionHistory[currentHistoryIndex]);
        updateUndoRedoButtons();
    }
}

function redoAction() {
    if (currentHistoryIndex < actionHistory.length - 1) {
        currentHistoryIndex++;
        restoreSettingsFromSnapshot(actionHistory[currentHistoryIndex]);
        updateUndoRedoButtons();
    }
}

function restoreSettingsFromSnapshot(snapshot) {
    try {
        const settings = JSON.parse(snapshot);
        
        levelsSlider.value = settings.levels;
        levelsValueDisplay.textContent = settings.levels;
        brightnessSlider.value = settings.brightness;
        brightnessValueDisplay.textContent = settings.brightness;
        contrastSlider.value = settings.contrast;
        contrastValueDisplay.textContent = settings.contrast;
        shadowInputSlider.value = settings.shadow;
        shadowInputValueDisplay.textContent = settings.shadow;
        midtoneGammaSlider.value = settings.midtone;
        midtoneGammaValueDisplay.textContent = parseFloat(settings.midtone).toFixed(1);
        highlightInputSlider.value = settings.highlight;
        highlightInputValueDisplay.textContent = settings.highlight;
        densityInput.value = settings.density;
        scaleFactorInput.value = settings.scale;
        colorSchemeSelect.value = settings.colorScheme;
        syncCustomColorsWithPreset(settings.colorScheme);
        // Font restore
        if ([...fontSelect.options].some(opt => opt.value === settings.font)) {
            fontSelect.value = settings.font;
        } else {
            fontSelect.selectedIndex = parseInt(settings.font) || 0;
        }
        characterSetSelect.value = settings.charSet;
        customCharsInput.value = settings.customChars;
        invertColorsToggle.checked = settings.invert;
        chromaRemovalToggle.checked = settings.chromaRemoval;
        previewChangesToggle.checked = settings.previewChanges !== undefined ? settings.previewChanges : true;
        

        if (settings.customText) customTextColor.value = settings.customText;
        if (settings.customBackground) customBackgroundColor.value = settings.customBackground;
        
        isBgColorTransparent = settings.transparentBg || false;
        transparentBgToggle.className = isBgColorTransparent ? 'btn-base ri-eye-off-line' : 'btn-base ri-eye-line';
        transparentBgToggle.style.opacity = '0.6';
        customBackgroundColor.disabled = isBgColorTransparent;
        customBackgroundColor.style.opacity = isBgColorTransparent ? '0.3' : '1';
        
        charSpacingSlider.value = settings.charSpacing || 0;
        charSpacingValueDisplay.textContent = settings.charSpacing || 0;
        
        isChromaRemovalActive = settings.chromaRemoval;
        isInvertColorsActive = settings.invert;
        isPreviewChangesActive = settings.previewChanges !== undefined ? settings.previewChanges : true;
        
        customCharsContainer.style.display = 'flex';
        if (characterSetSelect.value === 'custom') {
            customCharsInput.disabled = false;
            customCharsHelpButton.disabled = false;
        } else {
            customCharsInput.disabled = true;
            customCharsHelpButton.disabled = true;
        }
        

        
        processImageWithCurrentSettings();
        if (!isVideoInput) updateInputCanvasPreview();
        
    } catch (error) {
        console.error('Error restoring settings:', error);
    }
}

function clearCachedSequence() {
    cachedZipBlob = null;
    sequenceSettingsSnapshot = null;
    customCharSeqIndex = 0;
    updatePngSequenceButtonState();
}

function updatePngSequenceButtonState() {
    if (!isVideoInput) {
        downloadPngSequenceButton.style.display = 'none';
        return;
    }
    downloadPngSequenceButton.style.display = 'inline-flex';
    downloadPngSequenceButton.innerHTML = '<i class="ri-download-2-line"></i> Download Sequence';
    downloadPngSequenceButton.disabled = isSequenceRendering;
}

function toggleSequenceRenderingUI(isRendering, message = "") {
    isSequenceRendering = isRendering;
    cancelSequenceRenderFlag = false;

    if (isRendering) {
        outputCanvas.style.display = 'none';
        sequenceLoadingOverlay.style.display = 'flex';
        sequenceLoadingOverlayText.textContent = message || "Rendering Sequence...";
        sequenceLoadingMessage.textContent = message || "Rendering Sequence...";
        sequenceLoadingMessage.style.display = 'block';
        cancelSequenceButton.style.display = 'block';
    } else {
        outputCanvas.style.display = 'block';
        sequenceLoadingOverlay.style.display = 'none';
        sequenceLoadingMessage.style.display = 'none';
        sequenceLoadingMessage.textContent = "";
        cancelSequenceButton.style.display = 'none';
    }

    const controlsToDisable = [
        imageUpload, condensedImageUpload,
        levelsSlider, brightnessSlider,
        shadowInputSlider, midtoneGammaSlider, highlightInputSlider,
        invertColorsToggle, previewChangesToggle,
        densityInput, densityDecrement, densityIncrement, fontSelect, prevFontButton, nextFontButton,
        characterSetSelect, prevCharSetButton, nextCharSetButton, customCharsInput,
        scaleFactorInput, scaleFactorDecrement, scaleFactorIncrement, colorSchemeSelect, prevColorSchemeButton, nextColorSchemeButton,
        openNewTabButton, downloadPngButton, downloadTextButton
    ];

    controlsToDisable.forEach(control => {
        if (control) control.disabled = isRendering;
    });


    updatePngSequenceButtonState();
}

cancelSequenceButton.addEventListener('click', () => {
    cancelSequenceRenderFlag = true;
    sequenceLoadingOverlayText.textContent = "Cancelling rendering...";
    sequenceLoadingMessage.textContent = "Cancelling rendering...";
});


async function generateGlyphtrixFrameBlob(videoTime, tempCanvas, tempCtx, offscreenRenderCanvas, offscreenRenderCtx) {
    return new Promise(async (resolve, reject) => {
        if (cancelSequenceRenderFlag) {
            return reject(new Error("Sequence rendering cancelled by user."));
        }
        inputVideo.currentTime = videoTime;

        const onSeeked = async () => {
            inputVideo.removeEventListener('seeked', onSeeked);
            inputVideo.removeEventListener('error', onError);
            if (cancelSequenceRenderFlag) {
                return reject(new Error("Sequence rendering cancelled during seek."));
            }
            try {
                tempCtx.drawImage(inputVideo, 0, 0, currentImageOriginalWidth, currentImageOriginalHeight);
                let framePixelData = tempCtx.getImageData(0, 0, currentImageOriginalWidth, currentImageOriginalHeight).data;

                if (chromaRemovalToggle.checked) {
                    framePixelData = removeChroma(framePixelData, currentImageOriginalWidth, currentImageOriginalHeight, 10);
                }

                if (invertColorsToggle.checked) {
                    framePixelData = invertPixelData(framePixelData);
                }

                let processedData = applyContrast(new Uint8ClampedArray(framePixelData), currentImageOriginalWidth, currentImageOriginalHeight, parseInt(contrastSlider.value));
                processedData = applyLevelsAndBrightness(processedData, currentImageOriginalWidth, currentImageOriginalHeight, parseInt(brightnessSlider.value), parseInt(shadowInputSlider.value), parseFloat(midtoneGammaSlider.value), parseInt(highlightInputSlider.value));

                const frameGrayscaleLevels = generateGrayscaleLevels(parseInt(levelsSlider.value));
                const frameBlobMatrix = generateBlobMatrix(processedData, currentImageOriginalWidth, currentImageOriginalHeight, frameGrayscaleLevels, parseInt(densityInput.value), colorSchemeSelect.value, characterSetSelect.value);

                const baseCharSize = FIXED_FONT_SIZE;
                const effectiveCharSize = baseCharSize * parseFloat(scaleFactorInput.value);
                const charWidth = effectiveCharSize;
                const charHeight = effectiveCharSize;

                if (frameBlobMatrix.length === 0 || frameBlobMatrix[0].length === 0) {
                   return reject(new Error("Empty frame matrix generated"));
                }
                const numOutputRows = frameBlobMatrix.length;
                const numOutputCols = frameBlobMatrix[0].length;
                offscreenRenderCanvas.width = Math.max(1, numOutputCols * charWidth);
                offscreenRenderCanvas.height = Math.max(1, numOutputRows * charHeight);
                offscreenRenderCtx.fillStyle = getCanvasBackgroundColor(colorSchemeSelect.value);
                offscreenRenderCtx.fillRect(0, 0, offscreenRenderCanvas.width, offscreenRenderCanvas.height);
                offscreenRenderCtx.font = `${effectiveCharSize}px ${availableFonts[fontSelect.selectedIndex].cssName}`;
                offscreenRenderCtx.textAlign = 'left';
                offscreenRenderCtx.textBaseline = 'top';

                let currentY = 0;
                for (let y = 0; y < numOutputRows; y++) {
                    let currentX = 0;
                    for (let x = 0; x < numOutputCols; x++) {
                        if (frameBlobMatrix[y] && frameBlobMatrix[y][x]) {
                            offscreenRenderCtx.fillStyle = frameBlobMatrix[y][x].color;
                            offscreenRenderCtx.fillText(frameBlobMatrix[y][x].char, currentX, currentY);
                        }
                        currentX += charWidth;
                    }
                    currentY += charHeight;
                }

                offscreenRenderCanvas.toBlob(blob => {
                    if (blob) resolve(blob);
                    else reject(new Error("Failed to create blob from offscreen canvas"));
                }, 'image/png');

            } catch (error) {
                reject(error);
            }
        };

        const onError = (e) => {
            inputVideo.removeEventListener('seeked', onSeeked);
            inputVideo.removeEventListener('error', onError);
            reject(new Error("Video seeking error during sequence rendering."));
        };

        inputVideo.addEventListener('seeked', onSeeked, { once: true });
        inputVideo.addEventListener('error', onError, { once: true });
    });
}


async function downloadPngSequenceWithFps(fps) {
    if (!isVideoInput || inputVideo.readyState < inputVideo.HAVE_METADATA || isSequenceRendering) return;

    closeFpsModal();

    const currentSettings = getCurrentSettingsSnapshot(fps);
    if (cachedZipBlob && sequenceSettingsSnapshot === currentSettings) {
        const randomHash = generateRandomHash(8);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(cachedZipBlob);
        link.download = `Glyphtrix_sequence_${randomHash}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        return;
    }
    clearCachedSequence();

    const wasPaused = inputVideo.paused;
    if (!wasPaused) inputVideo.pause();

    toggleSequenceRenderingUI(true, "Initializing sequence rendering...");

    const pngBlobs = [];
    const videoDuration = inputVideo.duration;
    const selectedFps = fps;
    const frameInterval = 1 / selectedFps;
    const numFrames = Math.floor(videoDuration / frameInterval);

    const tempCaptureCanvas = document.createElement('canvas');
    tempCaptureCanvas.width = currentImageOriginalWidth;
    tempCaptureCanvas.height = currentImageOriginalHeight;
    const tempCaptureCtx = tempCaptureCanvas.getContext('2d');

    const offscreenRenderCanvas = document.createElement('canvas');
    const offscreenRenderCtx = offscreenRenderCanvas.getContext('2d');

    let renderingCancelled = false;
    try {
        for (let i = 0; i < numFrames; i++) {
            if (cancelSequenceRenderFlag) {
                renderingCancelled = true;
                sequenceLoadingOverlayText.textContent = "Rendering cancelled.";
                sequenceLoadingMessage.textContent = "Rendering cancelled.";
                await new Promise(r => setTimeout(r, 1500));
                break;
            }
            const currentTime = i * frameInterval;
            const progressMessage = `Rendering frame ${i + 1} of ${numFrames} and creating a .zip archive...`;
            sequenceLoadingOverlayText.textContent = progressMessage;
            sequenceLoadingMessage.textContent = progressMessage;

            const blob = await generateGlyphtrixFrameBlob(currentTime, tempCaptureCanvas, tempCaptureCtx, offscreenRenderCanvas, offscreenRenderCtx);
            pngBlobs.push(blob);
        }

        if (!renderingCancelled && pngBlobs.length > 0) {
            sequenceLoadingOverlayText.textContent = "Zipping frames and creating .zip archive...";
            sequenceLoadingMessage.textContent = "Zipping frames and creating .zip archive...";
            const zip = new JSZip();
            pngBlobs.forEach((blob, index) => {
                const frameNumber = (index + 1).toString().padStart(4, '0');
                zip.file(`frame_${frameNumber}.png`, blob);
            });

            cachedZipBlob = await zip.generateAsync({ type: "blob" });
            sequenceSettingsSnapshot = currentSettings;

            const randomHash = generateRandomHash(8);
            const link = document.createElement('a');
            link.href = URL.createObjectURL(cachedZipBlob);
            link.download = `Glyphtrix_sequence_${randomHash}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } else if (!renderingCancelled && numFrames > 0) {
            alert("No frames were rendered for the sequence. This might be due to a very short video or an issue.");
        }

    } catch (error) {
        if (!error.message.toLowerCase().includes("cancel")) {
            console.error("Error during PNG sequence rendering: ", error);
            alert(`Error during PNG sequence rendering: ${error.message}`);
        }
    } finally {
        toggleSequenceRenderingUI(false);
        if (!wasPaused && inputVideo.readyState >= inputVideo.HAVE_ENOUGH_DATA && !renderingCancelled) {
 
        }
        updatePngSequenceButtonState();
    }
}


function processCurrentFrame() {
    if (!inputVideo || inputVideo.paused || inputVideo.ended || inputVideo.readyState < inputVideo.HAVE_CURRENT_DATA) {
        stopVideoProcessingLoop();
        return;
    }
    processImageWithCurrentSettings().then(() => {
                if (isPreviewChangesActive) {
        updateInputCanvasPreview();
    }

    if (window.innerWidth <= 768 && mobilePreviewActive) {
        debouncedUpdateMobilePreview();
    }
        
        if (!inputVideo.paused && !inputVideo.ended) {
            videoProcessLoopId = requestAnimationFrame(processCurrentFrame);
        } else {
            stopVideoProcessingLoop();
        }
    }).catch(error => {
        console.error("Error processing video frame:", error);
        stopVideoProcessingLoop();
    });
}

function setDownloadButtonsState(disabled) {
    openNewTabButton.disabled = disabled;
    downloadPngButton.disabled = disabled;
    downloadTextButton.disabled = disabled;
}

function getFailsafeDensity(width) {
    if (width > 2500) {
        return 40;
    } else if (width >= 1000) {
        return 20;
    } else {
        return 10;
    }
}

function setDefaultValues(contentWidth = null) {
    levelsSlider.value = 4; levelsValueDisplay.textContent = '4';
    brightnessSlider.value = 0; brightnessValueDisplay.textContent = '0';
    contrastSlider.value = 0; contrastValueDisplay.textContent = '0';
    shadowInputSlider.value = 0; shadowInputValueDisplay.textContent = '0';
    midtoneGammaSlider.value = 1.0; midtoneGammaValueDisplay.textContent = '1.0';
    highlightInputSlider.value = 255; highlightInputValueDisplay.textContent = '255';
    chromaRemovalToggle.checked = false;
    invertColorsToggle.checked = false;
    isBgColorTransparent = false;
    transparentBgToggle.className = 'btn-base ri-eye-line';
    transparentBgToggle.style.opacity = '0.6';
    customBackgroundColor.disabled = false;
    customBackgroundColor.style.opacity = '1';
    charSpacingSlider.value = 0;
    charSpacingValueDisplay.textContent = '0';
    previewChangesToggle.checked = true;

    showExampleButtons();

    const failsafeDensity = contentWidth ? getFailsafeDensity(contentWidth) : 10;
    densityInput.value = failsafeDensity;
    scaleFactorInput.value = 1.0;
    colorSchemeSelect.value = 'color1';
    fontSelect.selectedIndex = 0;
    characterSetSelect.value = 'binary';
    customCharsInput.value = '0,1';
    customCharsContainer.style.display = 'flex';
    customCharsInput.disabled = false;
    customCharsHelpButton.disabled = false;
    customTextColor.value = '#00FF00';
    customBackgroundColor.value = '#000000';
    
    if (!window.savedCustomColors) {
        window.savedCustomColors = {
            text: '#00FF00',
            background: '#000000'
        };
    }
    gridSizeDisplay.textContent = '-';

    isChromaRemovalActive = chromaRemovalToggle.checked;
    currentBackgroundTolerance = 10;
    isInvertColorsActive = invertColorsToggle.checked;
    isPreviewChangesActive = previewChangesToggle.checked;
    currentNumLevels = parseInt(levelsSlider.value);
    currentBrightness = parseInt(brightnessSlider.value);
    currentContrast = parseInt(contrastSlider.value);
    currentShadowInput = parseInt(shadowInputSlider.value);
    currentMidtoneGamma = parseFloat(midtoneGammaSlider.value);
    currentHighlightInput = parseInt(highlightInputSlider.value);
    currentDensity = parseInt(densityInput.value);
    currentScaleFactor = parseFloat(scaleFactorInput.value);
    currentColorScheme = colorSchemeSelect.value;
    currentFontFamily = availableFonts[fontSelect.selectedIndex].cssName;
    currentCharacterSet = characterSetSelect.value;

    setDownloadButtonsState(true);
    clearCachedSequence();
}


function generateGrayscaleLevels(numLevels) {
    if (numLevels < 2) return [0, 1];
    const levels = [];
    for (let i = 0; i < numLevels; i++) { levels.push(i / (numLevels - 1)); }
    return levels;
}

function getRandomCharacterForLevel(grayscaleValue, charSet) {
    let charsToUse;
    switch (charSet) {
        case 'numbers': charsToUse = numbersChars; break;
        case 'latin_basic': charsToUse = latinBasicChars; break;
        case 'latin': charsToUse = latinChars; break;
        case 'cyrillic': charsToUse = cyrillicChars; break;
        case 'devanagari': charsToUse = devanagariChars; break;
        case 'thai': charsToUse = thaiChars; break;
        case 'japanese': charsToUse = japaneseChars; break;
        case 'korean': charsToUse = koreanChars; break;
        case 'chinese': charsToUse = chineseChars; break;
        case 'arabic': charsToUse = arabicChars; break;
        default: return '?';
    }
    return charsToUse[Math.floor(Math.random() * charsToUse.length)];
}


function invertPixelData(sourceData) {
    const invertedData = new Uint8ClampedArray(sourceData.length);
    for (let i = 0; i < sourceData.length; i += 4) {
        invertedData[i] = 255 - sourceData[i];
        invertedData[i + 1] = 255 - sourceData[i + 1];
        invertedData[i + 2] = 255 - sourceData[i + 2];
        invertedData[i + 3] = sourceData[i + 3];
    }
    return invertedData;
}

function applyContrast(sourceData, width, height, contrastAmount) {
    if (contrastAmount === 0) return new Uint8ClampedArray(sourceData);
    const outputData = new Uint8ClampedArray(sourceData);
    const factor = (259 * (contrastAmount + 255)) / (255 * (259 - contrastAmount));
    
    for (let i = 0; i < outputData.length; i += 4) {
        for (let c = 0; c < 3; c++) {
            let val = factor * (outputData[i + c] - 128) + 128;
            outputData[i + c] = Math.max(0, Math.min(255, val));
        }
    }
    return outputData;
}

function removeChroma(sourceData, width, height, tolerance) {
    if (!sourceData) return new Uint8ClampedArray(sourceData);
    
    const outputData = new Uint8ClampedArray(sourceData);
    
    // Sample corner pixels to detect chroma key color
    const corners = [
        0,
        (width - 1) * 4,
        (height - 1) * width * 4,
        ((height - 1) * width + (width - 1)) * 4
    ];
    
    let chromaR = 0, chromaG = 0, chromaB = 0;
    let validCorners = 0;
    
    for (let corner of corners) {
        if (corner < sourceData.length - 3) {
            chromaR += sourceData[corner];
            chromaG += sourceData[corner + 1];
            chromaB += sourceData[corner + 2];
            validCorners++;
        }
    }
    
    if (validCorners === 0) return outputData;
    
    chromaR = Math.round(chromaR / validCorners);
    chromaG = Math.round(chromaG / validCorners);
    chromaB = Math.round(chromaB / validCorners);
    
    const toleranceValue = tolerance * 2.55;
    
    for (let i = 0; i < outputData.length; i += 4) {
        const r = outputData[i];
        const g = outputData[i + 1];
        const b = outputData[i + 2];
        
        const diff = Math.sqrt(
            Math.pow(r - chromaR, 2) + 
            Math.pow(g - chromaG, 2) + 
            Math.pow(b - chromaB, 2)
        );
        
        if (diff <= toleranceValue) {
            const replacement = (typeof isInvertColorsActive !== 'undefined' && isInvertColorsActive) ? 255 : 0;
            outputData[i] = replacement;
            outputData[i + 1] = replacement;
            outputData[i + 2] = replacement;
        }
    }
    
    return outputData;
}


function applyLevelsAndBrightness(sourcePixelData, width, height, brightness, shadowIn, gamma, highlightIn) {
    const data = new Uint8ClampedArray(sourcePixelData);
    const bVal = (brightness / 100.0) * 127.5;
    const invGamma = 1.0 / gamma;
    const inputRange = Math.max(1, highlightIn - shadowIn);
    for (let i = 0; i < data.length; i += 4) {
        for (let c = 0; c < 3; c++) {
            let val = data[i + c] + bVal;
            if (val <= shadowIn) { val = 0; }
            else if (val >= highlightIn) { val = 255; }
            else { val = ((val - shadowIn) / inputRange) * 255; }
            val = 255 * Math.pow(val / 255, invGamma);
            data[i + c] = Math.max(0, Math.min(255, val));
        }
    }
    return data;
}

function getCharacterDisplayColor(level, scheme, rowIndex = 0, totalRows = 1) {
    const value = Math.round(level * 255);
    switch (scheme) {
                        case 'color1': return `rgb(0, ${value}, 0)`;
    case 'color2': return `rgb(${value}, ${value}, ${value})`;
    case 'color3': {
        const textColor = {r: 17, g: 251, b: 254};
        const bgColor = hexToRgb(customBackgroundColor.value);
        if (value === 0) return `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`;
        return `rgb(${bgColor.r + Math.round((textColor.r - bgColor.r) * value / 255)}, ${bgColor.g + Math.round((textColor.g - bgColor.g) * value / 255)}, ${bgColor.b + Math.round((textColor.b - bgColor.b) * value / 255)})`;
    }
    case 'color4': {
        const textColor = {r: 79, g: 225, b: 152};
        const bgColor = hexToRgb(customBackgroundColor.value);
        if (value === 0) return `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`;
        return `rgb(${bgColor.r + Math.round((textColor.r - bgColor.r) * value / 255)}, ${bgColor.g + Math.round((textColor.g - bgColor.g) * value / 255)}, ${bgColor.b + Math.round((textColor.b - bgColor.b) * value / 255)})`;
    }
    case 'color5': {
        const textColor = {r: 255, g: 107, b: 53};
        const bgColor = hexToRgb(customBackgroundColor.value);
        if (value === 0) return `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`;
        return `rgb(${bgColor.r + Math.round((textColor.r - bgColor.r) * value / 255)}, ${bgColor.g + Math.round((textColor.g - bgColor.g) * value / 255)}, ${bgColor.b + Math.round((textColor.b - bgColor.b) * value / 255)})`;
    }

        case 'custom': {
            const textColor = hexToRgb(customTextColor.value);
            const bgColor = isBgColorTransparent ? {r: 0, g: 0, b: 0} : hexToRgb(customBackgroundColor.value);
            const brightness = level;
            
            if (brightness === 0) {
                if (isBgColorTransparent) {
                    return 'rgba(0, 0, 0, 0)';
                }
                return `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`;
            }
            
            return `rgb(${Math.round(textColor.r * brightness)}, ${Math.round(textColor.g * brightness)}, ${Math.round(textColor.b * brightness)})`;
        }
        default: return `rgb(0, ${value}, 0)`;
    }
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {r: 0, g: 255, b: 0};
}
function syncCustomColorsWithPreset(scheme) {
    const customTextColor = document.getElementById('customTextColor');
    const customBackgroundColor = document.getElementById('customBackgroundColor');
    
    if (!customTextColor || !customBackgroundColor) return;
    
    switch (scheme) {
        case 'color1':
            customTextColor.value = '#00FF00';
            customBackgroundColor.value = '#000000';
            break;
        case 'color2':
            customTextColor.value = '#FFFFFF';
            customBackgroundColor.value = '#000000';
            break;
        case 'color3':
            customTextColor.value = '#11fbfe';
            customBackgroundColor.value = '#14391d';
            break;
        case 'color4':
            customTextColor.value = '#4fe198';
            customBackgroundColor.value = '#19062a';
            break;
        case 'color5':
            customTextColor.value = '#ff6b35';
            customBackgroundColor.value = '#0a0a0a';
            break;
        case 'custom':
            if (window.savedCustomColors) {
                customTextColor.value = window.savedCustomColors.text || '#00FF00';
                customBackgroundColor.value = window.savedCustomColors.background || '#000000';
            }
            break;
        default:
            customTextColor.value = '#00FF00';
            customBackgroundColor.value = '#000000';
    }
}

function getCanvasBackgroundColor(scheme) {
    switch (scheme) {
        case 'color1': case 'color2': return getComputedStyle(document.documentElement).getPropertyValue('--primary-bg');
        case 'color3': case 'color4': case 'color5': case 'custom': 
            return isBgColorTransparent ? 'transparent' : customBackgroundColor.value;
        default: return getComputedStyle(document.documentElement).getPropertyValue('--primary-bg');
    }
}

function drawPosterizedPreview(pixelDataToProcess, width, height, levelsArray) {
    inputCanvas.width = width;
    inputCanvas.height = height;
    const previewCtx = inputCanvas.getContext('2d');
    previewCtx.clearRect(0, 0, width, height);
    const outputImageData = previewCtx.createImageData(width, height);
    const outputData = outputImageData.data;
    for (let i = 0; i < pixelDataToProcess.length; i += 4) {
        const r = pixelDataToProcess[i], g = pixelDataToProcess[i + 1], b = pixelDataToProcess[i + 2], a = pixelDataToProcess[i + 3];
        const grayscale = (r + g + b) / 3;
        let closestLevelValue = levelsArray[0];
        let minDiff = Math.abs(grayscale - closestLevelValue * 255);
        for (let j = 1; j < levelsArray.length; j++) {
            const diff = Math.abs(grayscale - levelsArray[j] * 255);
            if (diff < minDiff) { minDiff = diff; closestLevelValue = levelsArray[j];}
        }
        const posterizedVal = Math.round(closestLevelValue * 255);
        outputData[i] = posterizedVal; outputData[i + 1] = posterizedVal; outputData[i + 2] = posterizedVal; outputData[i + 3] = a;
    }
    previewCtx.putImageData(outputImageData, 0, 0);
}

async function updateInputCanvasPreview() {
    if (!currentMediaElement || (isVideoInput && !currentMediaElement.videoWidth) || (!isVideoInput && !originalPixelData)) {
         inputCtx.clearRect(0, 0, inputCanvas.width, inputCanvas.height);
        return;
    }

    const isMobile = window.innerWidth <= 768;
    if (isMobile && isVideoInput) {
        inputVideo.style.display = 'block';
        inputCanvas.style.display = 'none';
        return;
    }

    if (isVideoInput) {
        if (isPreviewChangesActive && !isMobile) {
            inputVideo.style.display = 'none';
            inputCanvas.style.display = 'block';
            
            // Capture current video frame
            inputCanvas.width = currentImageOriginalWidth;
            inputCanvas.height = currentImageOriginalHeight;
            inputCtx.drawImage(inputVideo, 0, 0, currentImageOriginalWidth, currentImageOriginalHeight);
            
            let framePixelData = inputCtx.getImageData(0, 0, currentImageOriginalWidth, currentImageOriginalHeight).data;
            
            if (isChromaRemovalActive) {
                framePixelData = removeChroma(framePixelData, currentImageOriginalWidth, currentImageOriginalHeight, currentBackgroundTolerance);
            }
            
            if (isInvertColorsActive) {
                framePixelData = invertPixelData(framePixelData);
            }
            
            const tempContrast = parseInt(contrastSlider.value);
            const tempBrightness = parseInt(brightnessSlider.value);
            const tempShadow = parseInt(shadowInputSlider.value);
            const tempGamma = parseFloat(midtoneGammaSlider.value);
            const tempHighlight = parseInt(highlightInputSlider.value);
            const tempNumLevels = parseInt(levelsSlider.value);
            
            let processedForPreview = applyContrast(new Uint8ClampedArray(framePixelData), currentImageOriginalWidth, currentImageOriginalHeight, tempContrast);
            processedForPreview = applyLevelsAndBrightness(processedForPreview, currentImageOriginalWidth, currentImageOriginalHeight, tempBrightness, tempShadow, tempGamma, tempHighlight);
            
            const previewLevels = generateGrayscaleLevels(tempNumLevels);
            drawPosterizedPreview(processedForPreview, currentImageOriginalWidth, currentImageOriginalHeight, previewLevels);
        } else {
        inputVideo.style.display = 'block';
        inputCanvas.style.display = 'none';
        }
        return;
    }

    if(invertColorsContainer) invertColorsContainer.style.display = 'flex';
    if(previewChangesContainer) previewChangesContainer.style.display = 'flex';


    let dataForPreview = new Uint8ClampedArray(originalPixelData);
    
    if (isChromaRemovalActive) {
        dataForPreview = removeChroma(dataForPreview, currentImageOriginalWidth, currentImageOriginalHeight, currentBackgroundTolerance);
    }
    
    if (isInvertColorsActive) {
        dataForPreview = invertPixelData(dataForPreview);
    }

    if (isPreviewChangesActive && !isMobile) {
        loadingSpinner.style.display = 'inline';
    if (mobileLoadingSpinner) mobileLoadingSpinner.style.display = 'inline';
        await new Promise(resolve => setTimeout(resolve, 0));
                const tempContrast = parseInt(contrastSlider.value);
        const tempBrightness = parseInt(brightnessSlider.value);
        const tempShadow = parseInt(shadowInputSlider.value);
        const tempGamma = parseFloat(midtoneGammaSlider.value);
        const tempHighlight = parseInt(highlightInputSlider.value);
        const tempNumLevels = parseInt(levelsSlider.value);
        let processedForPreview = applyContrast(dataForPreview, currentImageOriginalWidth, currentImageOriginalHeight, tempContrast);
        processedForPreview = applyLevelsAndBrightness(processedForPreview, currentImageOriginalWidth, currentImageOriginalHeight, tempBrightness, tempShadow, tempGamma, tempHighlight);
        const previewLevels = generateGrayscaleLevels(tempNumLevels);
        drawPosterizedPreview(processedForPreview, currentImageOriginalWidth, currentImageOriginalHeight, previewLevels);
        loadingSpinner.style.display = 'none';
    if (mobileLoadingSpinner) mobileLoadingSpinner.style.display = 'none';
    } else {
         inputCanvas.width = currentImageOriginalWidth;
         inputCanvas.height = currentImageOriginalHeight;
         inputCtx.clearRect(0, 0, inputCanvas.width, inputCanvas.height);
         if (isInvertColorsActive) {
            const invertedOnly = invertPixelData(originalPixelData);
            const tempImgData = inputCtx.createImageData(currentImageOriginalWidth, currentImageOriginalHeight);
            tempImgData.data.set(invertedOnly);
            inputCtx.putImageData(tempImgData, 0, 0);
        } else {
            inputCtx.drawImage(currentMediaElement, 0, 0, currentImageOriginalWidth, currentImageOriginalHeight);
        }
    }
    
    if (currentMobileView === 'input') {
        debouncedUpdateMobilePreview();
    }
}

function generateBlobMatrix(pixelDataToProcess, originalWidth, originalHeight, levelsArray, densityStep, colorScheme, charSet) {
    let blobMatrix = [];
    
    const totalRows = Math.ceil(originalHeight / densityStep);
    let currentRowIndex = 0;
    
    const charSpacing = currentCharSpacing || 0;
    const totalCols = Math.ceil(originalWidth / densityStep);
    const colsToAdjust = Math.floor(charSpacing);
    const effectiveCols = Math.max(1, totalCols - colsToAdjust);
    const adjustedDensityStep = originalWidth / effectiveCols;

    // Process from bottom to top to reverse the movement illusion
    for (let y = originalHeight - densityStep; y >= 0; y -= densityStep) {
        let blobRow = [];
        for (let colIndex = 0; colIndex < effectiveCols; colIndex++) {
            const x = Math.floor(colIndex * adjustedDensityStep);
            let avgR = 0, avgG = 0, avgB = 0, count = 0;
            for (let subY = 0; subY < densityStep && (y + subY) < originalHeight; subY++) {
                for (let subX = 0; subX < densityStep && (x + subX) < originalWidth; subX++) {
                    const i = ((y + subY) * originalWidth + (x + subX)) * 4;
                    avgR += pixelDataToProcess[i]; avgG += pixelDataToProcess[i+1]; avgB += pixelDataToProcess[i+2]; count++;
                }
            }
            if (count === 0) continue;
            avgR /= count; avgG /= count; avgB /= count;
            const grayscale = (avgR + avgG + avgB) / 3;
            let closestLevelValue = levelsArray[0];
            let minDiff = Math.abs(grayscale - closestLevelValue * 255);
            for (let j = 1; j < levelsArray.length; j++) {
                const diff = Math.abs(grayscale - levelsArray[j] * 255);
                if (diff < minDiff) { minDiff = diff; closestLevelValue = levelsArray[j]; }
            }
            let char = ' '; let color = getCharacterDisplayColor(0, colorScheme); let shouldDrawChar = false;
            if (colorScheme === 'blackOnWhite') {
                shouldDrawChar = closestLevelValue < 1 || (levelsArray.length === 1 && levelsArray[0] === 1 && grayscale > 128);
            } else {
                shouldDrawChar = closestLevelValue > 0 || (levelsArray.length === 1 && levelsArray[0] === 0 && grayscale < 128) || (levelsArray.length > 1 && closestLevelValue === 0);
            }

            if (shouldDrawChar) {
                if (charSet === 'custom') {
                    const customText = customCharsInput.value.trim();
                    if (customText) {
                        if (customText.includes(',')) {
                            const customItems = customText.split(',').map(s => s.trim()).filter(s => s);
                            if (customItems.length > 0) {
                                const selectedItem = customItems[Math.floor(Math.random() * customItems.length)];
                                if (selectedItem.length > 1) {
                                    char = selectedItem[customCharSeqIndex % selectedItem.length];
                                    customCharSeqIndex++;
                                } else {
                                    char = selectedItem;
                                }
                            } else { char = '#'; }
                        } else if (customText.includes('.')) {
                            const customItems = customText.split('.').map(s => s.trim()).filter(s => s);
                            if (customItems.length > 0) {
                                const flattenedChars = customItems.join('');
                                char = flattenedChars[customCharSeqIndex % flattenedChars.length];
                                customCharSeqIndex++;
                            } else { char = '#'; }
                        } else {
                            char = customText[customCharSeqIndex % customText.length];
                            customCharSeqIndex++;
                        }
                    } else { char = '#'; }
                } else if (charSet.startsWith('preset') || charSet === 'binary') {
                    const presetValues = {
                         'binary': '0,1', 'preset1': 'ABC', 'preset2': 'A,B,C', 'preset3': '⦁', 'preset4': '●',
                         'preset5': '⬤', 'preset6': '〇', 'preset7': '■', 'preset8': '█', 'preset9': '▃',
                         'preset10': '⯁', 'preset11': '✖', 'preset12': '✚', 'preset13': '╋', 'preset14': '⧸,⧹'
                     };
                    const presetText = presetValues[charSet] || '#';
                    if (presetText.includes(',')) {
                        const presetItems = presetText.split(',').map(s => s.trim()).filter(s => s);
                        if (presetItems.length > 0) {
                            char = presetItems[Math.floor(Math.random() * presetItems.length)];
                        } else { char = '#'; }
                    } else {
                        char = presetText[customCharSeqIndex % presetText.length];
                        customCharSeqIndex++;
                    }
                } else {
                    char = getRandomCharacterForLevel(closestLevelValue, charSet);
                }
                color = getCharacterDisplayColor(closestLevelValue, colorScheme, currentRowIndex, totalRows);
            }
            blobRow.push({char: char, color: color});
        }
        if (blobRow.length > 0) { 
            blobMatrix.unshift(blobRow);
            currentRowIndex++;
        }
    }
    return blobMatrix;
}

function drawTextOnCanvas(matrixToDraw, scaleFactor, colorScheme, fontFamily) {
    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            const baseCharSize = FIXED_FONT_SIZE;
            const effectiveCharSize = baseCharSize * scaleFactor;
            const charSpacing = currentCharSpacing || 0;
            const charWidth = effectiveCharSize;
            const charHeight = effectiveCharSize;
            
            if (matrixToDraw.length === 0 || matrixToDraw[0].length === 0) {
                outputCanvas.width = 1; outputCanvas.height = 1; outputCtx.clearRect(0,0,1,1);
                if (outputResolutionDisplay) outputResolutionDisplay.textContent = `${outputCanvas.width}x${outputCanvas.height}`;
                if (gridSizeDisplay) gridSizeDisplay.textContent = `0x0`;
                resolve(); return;
            }
            const numOutputRows = matrixToDraw.length; const numOutputCols = matrixToDraw[0].length;
            
            const colsToAdjust = Math.floor(charSpacing);
            const originalCols = numOutputCols + colsToAdjust;
            
            outputCanvas.width = Math.max(1, originalCols * charWidth);
            outputCanvas.height = Math.max(1, numOutputRows * charHeight);
            if (outputResolutionDisplay) outputResolutionDisplay.textContent = `${outputCanvas.width}x${outputCanvas.height}`;
            if (gridSizeDisplay) gridSizeDisplay.textContent = `${numOutputCols}x${numOutputRows}`;

            const cellWidth = numOutputCols > 1 ? outputCanvas.width / numOutputCols : charWidth;

            if (isRandomSpacingActive && (columnOffsets.length !== numOutputCols || charSpacing !== currentCharSpacing)) {
                columnOffsets = [];
                const maxOffset = Math.abs(charSpacing);
                for (let i = 0; i < numOutputCols; i++) {
                    columnOffsets.push((Math.random() - 0.5) * 2 * maxOffset);
                }
            }

            outputCtx.font = `${effectiveCharSize}px ${fontFamily}`;
            outputCtx.textAlign = 'left'; outputCtx.textBaseline = 'top';
            outputCtx.fillStyle = getCanvasBackgroundColor(colorScheme);
            outputCtx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);

            let currentY = 0;
            for (let y = 0; y < numOutputRows; y++) {
                let currentX = 0;
                for (let x = 0; x < numOutputCols; x++) {
                    if (matrixToDraw[y] && matrixToDraw[y][x]) {
                        const cellColor = matrixToDraw[y][x].color;
                        if (cellColor !== 'rgba(0, 0, 0, 0)') {
                            outputCtx.fillStyle = cellColor;
                            const xOffset = isRandomSpacingActive ? (columnOffsets[x] || 0) : 0;
                            outputCtx.fillText(matrixToDraw[y][x].char, currentX + xOffset, currentY);
                        }
                    }
                    currentX += cellWidth;
                }
                currentY += charHeight;
            }
            resolve();
        });
    });
    
    forceUpdateMobileOutputCanvas();
}
function stopVideoProcessingLoop() {
    if (videoProcessLoopId !== null) {
        cancelAnimationFrame(videoProcessLoopId);
        videoProcessLoopId = null;
    }
}


async function processImageWithCurrentSettings() {
    if (isSequenceRendering) return;

    // Only hide example buttons if there's a file loaded
    if (currentMediaElement || originalPixelData) {
        hideExampleButtons();
    }

    loadingSpinner.style.display = 'inline';
    if (mobileLoadingSpinner) mobileLoadingSpinner.style.display = 'inline';
    if (!isVideoInput || inputVideo.paused) {
         setDownloadButtonsState(true);
    }

    isChromaRemovalActive = chromaRemovalToggle.checked;
    currentBackgroundTolerance = 10;
    isInvertColorsActive = invertColorsToggle.checked;
    currentNumLevels = parseInt(levelsSlider.value);
    currentBrightness = parseInt(brightnessSlider.value);
    currentContrast = parseInt(contrastSlider.value);
    currentShadowInput = parseInt(shadowInputSlider.value);
    currentMidtoneGamma = parseFloat(midtoneGammaSlider.value);
    currentHighlightInput = parseInt(highlightInputSlider.value);
    currentDensity = parseInt(densityInput.value);
    currentScaleFactor = parseFloat(scaleFactorInput.value);
    currentCharSpacing = parseInt(charSpacingSlider.value);
    currentColorScheme = colorSchemeSelect.value;
    currentFontFamily = availableFonts[fontSelect.selectedIndex].cssName;
    currentCharacterSet = characterSetSelect.value;

    await new Promise(resolve => setTimeout(resolve, 0));

    let sourcePixelData;
    if (isVideoInput) {
        if (!currentMediaElement || currentMediaElement.readyState < inputVideo.HAVE_CURRENT_DATA ) {
            loadingSpinner.style.display = 'none';
        if (mobileLoadingSpinner) mobileLoadingSpinner.style.display = 'none';
            setDownloadButtonsState(true);
            return;
        }
        const tempVidCanvas = document.createElement('canvas');
        tempVidCanvas.width = currentImageOriginalWidth;
        tempVidCanvas.height = currentImageOriginalHeight;
        const tempVidCtx = tempVidCanvas.getContext('2d');
        tempVidCtx.drawImage(currentMediaElement, 0, 0, currentImageOriginalWidth, currentImageOriginalHeight);
        sourcePixelData = tempVidCtx.getImageData(0, 0, currentImageOriginalWidth, currentImageOriginalHeight).data;

        if (isChromaRemovalActive) {
            sourcePixelData = removeChroma(sourcePixelData, currentImageOriginalWidth, currentImageOriginalHeight, currentBackgroundTolerance);
        }
        if (isInvertColorsActive) {
            sourcePixelData = invertPixelData(sourcePixelData);
        }

    } else {
        if (!originalPixelData) {
            loadingSpinner.style.display = 'none';
        if (mobileLoadingSpinner) mobileLoadingSpinner.style.display = 'none';
            setDownloadButtonsState(true);
            return;
        }
        sourcePixelData = new Uint8ClampedArray(originalPixelData);
        if (isChromaRemovalActive) {
            sourcePixelData = removeChroma(sourcePixelData, currentImageOriginalWidth, currentImageOriginalHeight, currentBackgroundTolerance);
        }
        if (isInvertColorsActive) {
            sourcePixelData = invertPixelData(sourcePixelData);
        }
    }

    let processedData = applyContrast(new Uint8ClampedArray(sourcePixelData), currentImageOriginalWidth, currentImageOriginalHeight, currentContrast);
    processedData = applyLevelsAndBrightness(processedData, currentImageOriginalWidth, currentImageOriginalHeight, currentBrightness, currentShadowInput, currentMidtoneGamma, currentHighlightInput);

    if (!isVideoInput && isPreviewChangesActive) {
        const previewLevels = generateGrayscaleLevels(currentNumLevels);
        let previewBaseData = new Uint8ClampedArray(originalPixelData);
        if (chromaRemovalToggle.checked) {
            previewBaseData = removeChroma(previewBaseData, currentImageOriginalWidth, currentImageOriginalHeight, 10);
        }
        if (invertColorsToggle.checked) {
            previewBaseData = invertPixelData(previewBaseData);
        }
                        let previewProcessed = applyContrast(previewBaseData, currentImageOriginalWidth, currentImageOriginalHeight, parseInt(contrastSlider.value));
        previewProcessed = applyLevelsAndBrightness(previewProcessed, currentImageOriginalWidth, currentImageOriginalHeight, parseInt(brightnessSlider.value), parseInt(shadowInputSlider.value), parseFloat(midtoneGammaSlider.value), parseInt(highlightInputSlider.value));
        drawPosterizedPreview(previewProcessed, currentImageOriginalWidth, currentImageOriginalHeight, previewLevels);

    } else if (isVideoInput && isPreviewChangesActive) {
        updateInputCanvasPreview();
    } else if (isVideoInput) {
         inputVideo.style.display = 'block';
         inputCanvas.style.display = 'none';
    }

    const localGrayscaleLevels = generateGrayscaleLevels(currentNumLevels);
    currentBlobMatrix = generateBlobMatrix(processedData, currentImageOriginalWidth, currentImageOriginalHeight, localGrayscaleLevels, currentDensity, currentColorScheme, currentCharacterSet);
    await drawTextOnCanvas(currentBlobMatrix, currentScaleFactor, currentColorScheme, currentFontFamily);

    loadingSpinner.style.display = 'none';
    if (mobileLoadingSpinner) mobileLoadingSpinner.style.display = 'none';
    setDownloadButtonsState(false);
    
    if (window.innerWidth <= 768 && mobilePreviewActive) {
        debouncedUpdateMobilePreview();
    }
}

function handleImageUpload(file) {
    stopVideoProcessingLoop();
    clearCachedSequence();
    isVideoInput = false;
    loadingSpinner.style.display = 'inline';
    if (mobileLoadingSpinner) mobileLoadingSpinner.style.display = 'inline';
    setDownloadButtonsState(true);
    downloadPngSequenceButton.style.display = 'none';
    showUploadSpinner();
    hideExampleButtons();

    inputVideo.style.display = 'none';
    inputVideo.pause();
    inputVideo.onloadedmetadata = null;
    inputVideo.onerror = null;
    inputVideo.onplay = null;
    inputVideo.onpause = null;
    inputVideo.onended = null;
    inputVideo.onseeked = null;
    inputVideo.src = "";
    inputCanvas.style.display = 'none';

    const reader = new FileReader();
    reader.onload = function(event) {
        if (file.type.startsWith('video/')) {
            isVideoInput = true;
            currentMediaElement = inputVideo;
            inputVideo.src = event.target.result;
            inputVideo.onloadedmetadata = async () => {
                currentImageOriginalWidth = inputVideo.videoWidth;
                currentImageOriginalHeight = inputVideo.videoHeight;
                customCharSeqIndex = 0;

                inputVideo.style.display = 'block';
                inputCanvas.style.display = 'none';

                uploadZone.style.display = 'none';
                if(uploadPanelTitle) uploadPanelTitle.style.display = 'block';
                if(condensedUploadZone) condensedUploadZone.style.display = 'inline-block';
                if(condensedFilename) condensedFilename.innerHTML = `<i class="ri-check-line"></i> ${file.name} `;

                hideExampleButtons();

                if(previewChangesContainer) previewChangesContainer.style.display = 'flex';

                setDefaultValues(inputVideo.videoWidth);
                
                previewChangesToggle.checked = false;
                isPreviewChangesActive = false;
                previewChangesToggle.disabled = true;
                currentDensity = parseInt(densityInput.value);

                if(chromaRemovalContainer) chromaRemovalContainer.style.display = 'flex';
                if(invertColorsContainer) invertColorsContainer.style.display = 'flex';

                await processImageWithCurrentSettings();
                loadingSpinner.style.display = 'none';
                if (mobileLoadingSpinner) mobileLoadingSpinner.style.display = 'none';
                hideUploadSpinner();
                updatePngSequenceButtonState();
                
                initializeHistoryForNewFile();
                
                previewChangesToggle.disabled = true;
                
                if (inputVideo.duration > 1) {
                    inputVideo.currentTime = 1;
                }
                
                if (inputVideo.paused) {
                    previewChangesToggle.disabled = false;
                }
                
                if (window.innerWidth <= 768 && mobilePreviewActive) {
                    switchMobileView('output');
                } else {
                    debouncedUpdateMobilePreview();
                }

                inputVideo.onplay = () => {
                    clearCachedSequence();
                    stopVideoProcessingLoop();
                    if (previewChangesToggle.checked) {
                        previewChangesToggle.checked = false;
                        isPreviewChangesActive = false;
                        updateInputCanvasPreview();
                    }
                    previewChangesToggle.disabled = true;
                    videoProcessLoopId = requestAnimationFrame(processCurrentFrame);
                };
                inputVideo.onpause = () => {
                    previewChangesToggle.disabled = false;
                    processImageWithCurrentSettings();
                };
                inputVideo.onended = () => stopVideoProcessingLoop();
                
                let seekDebounceTimeout;
                inputVideo.onseeked = () => {
                    clearTimeout(seekDebounceTimeout);
                    seekDebounceTimeout = setTimeout(() => {
                        if (inputVideo.paused && inputVideo.readyState >= inputVideo.HAVE_CURRENT_DATA) {
                            syncMobileVideoTime();
                            
                            processImageWithCurrentSettings().then(() => {
                                if (window.innerWidth <= 768 && currentMobileView === 'output') {
                                    debouncedUpdateMobilePreview();
                                }
                            });
                        }
                    }, 100);
                };
            };
             inputVideo.onerror = () => {
                alert("Error loading video.");
                loadingSpinner.style.display = 'none';
                if (mobileLoadingSpinner) mobileLoadingSpinner.style.display = 'none';
                hideUploadSpinner();
                setDownloadButtonsState(true);
                updatePngSequenceButtonState();
            };
        } else if (file.type.startsWith('image/')) {
            isVideoInput = false;
            const img = new Image();
            currentMediaElement = img;
            img.onload = async function() {
                currentImageOriginalWidth = img.width;
                currentImageOriginalHeight = img.height;
                randomNumberMap = {};
                customCharSeqIndex = 0;

                inputCanvas.width = currentImageOriginalWidth;
                inputCanvas.height = currentImageOriginalHeight;

                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = currentImageOriginalWidth;
                tempCanvas.height = currentImageOriginalHeight;
                const tempCtx = tempCanvas.getContext('2d');
                tempCtx.drawImage(img, 0, 0, currentImageOriginalWidth, currentImageOriginalHeight);
                originalPixelData = tempCtx.getImageData(0, 0, currentImageOriginalWidth, currentImageOriginalHeight).data;

                if(chromaRemovalContainer) chromaRemovalContainer.style.display = 'flex';
                if(invertColorsContainer) invertColorsContainer.style.display = 'flex';
                if(previewChangesContainer) previewChangesContainer.style.display = 'flex';

                previewChangesToggle.disabled = false;

                setDefaultValues(img.width);
                currentDensity = parseInt(densityInput.value);

                await processImageWithCurrentSettings();
                await updateInputCanvasPreview();
                inputCanvas.style.display = 'block';
                uploadZone.style.display = 'none';
                if(uploadPanelTitle) uploadPanelTitle.style.display = 'block';
                
                hideExampleButtons();
                
                hideUploadSpinner();
                updatePngSequenceButtonState();
                
                initializeHistoryForNewFile();
                
                if (window.innerWidth <= 768 && mobilePreviewActive) {
                    switchMobileView('output');
                } else {
                    debouncedUpdateMobilePreview();
                }
            }
            img.src = event.target.result;
             img.onerror = () => {
                alert("Error loading image.");
                loadingSpinner.style.display = 'none';
                if (mobileLoadingSpinner) mobileLoadingSpinner.style.display = 'none';
                hideUploadSpinner();
                setDownloadButtonsState(true);
                updatePngSequenceButtonState();
            };
        } else {
            alert('Unsupported file type.');
            loadingSpinner.style.display = 'none';
            if (mobileLoadingSpinner) mobileLoadingSpinner.style.display = 'none';
            hideUploadSpinner();
            setDownloadButtonsState(true);
            updatePngSequenceButtonState();
        }
    }
    reader.readAsDataURL(file);
}

imageUpload.addEventListener('change', function(e) {
   if (e.target.files && e.target.files[0]) {
       handleImageUpload(e.target.files[0]);
       condensedUploadZone.style.display = 'inline-block';
       condensedFilename.innerHTML = `<i class="ri-check-line"></i> ${e.target.files[0].name} `;
       if(uploadPanelTitle) uploadPanelTitle.style.display = 'block';
   }
});
condensedImageUpload.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        handleImageUpload(file);
        condensedFilename.innerHTML = `<i class="ri-check-line"></i> ${file.name} `;
        if(uploadPanelTitle) uploadPanelTitle.style.display = 'block';
    }
});

// Enhanced touch handling for sliders to prevent accidental activation during scrolling
function addMobileTouchHandling(slider) {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartValue = 0;
    let isDragging = false;
    let hasMovedHorizontally = false;
    const TOUCH_THRESHOLD = 10;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartValue = parseFloat(slider.value);
        isDragging = false;
        hasMovedHorizontally = false;
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = Math.abs(touchX - touchStartX);
        const deltaY = Math.abs(touchY - touchStartY);

        if (deltaX > TOUCH_THRESHOLD && deltaX > deltaY) {
            hasMovedHorizontally = true;
            isDragging = true;
            e.preventDefault();
        } else if (deltaY > TOUCH_THRESHOLD && !hasMovedHorizontally) {
            return;
        }
    }, { passive: false });

    slider.addEventListener('touchend', (e) => {
        if (!hasMovedHorizontally && Math.abs(parseFloat(slider.value) - touchStartValue) > 0) {
            slider.value = touchStartValue;
            if (slider === contrastSlider) contrastValueDisplay.textContent = slider.value;
            else if (slider === levelsSlider) levelsValueDisplay.textContent = slider.value;
            else if (slider === brightnessSlider) brightnessValueDisplay.textContent = slider.value;
            else if (slider === shadowInputSlider) shadowInputValueDisplay.textContent = slider.value;
            else if (slider === midtoneGammaSlider) midtoneGammaValueDisplay.textContent = parseFloat(slider.value).toFixed(1);
            else if (slider === highlightInputSlider) highlightInputValueDisplay.textContent = slider.value;
        }
        isDragging = false;
        hasMovedHorizontally = false;
    }, { passive: true });
}

function addSettingsChangeListener(element, eventType = 'input') {
    element.addEventListener(eventType, () => {
        clearCachedSequence();
        if (element === previewChangesToggle) {
            const isMobile = window.innerWidth <= 768;
            isPreviewChangesActive = !isMobile && element.checked;
            if (isVideoInput && element.checked && !inputVideo.paused && !isMobile) {
                inputVideo.pause();
            }
            updateInputCanvasPreview();
        } else {
            if (element === contrastSlider) contrastValueDisplay.textContent = element.value;
            else if (element === levelsSlider) levelsValueDisplay.textContent = element.value;
            else if (element === brightnessSlider) brightnessValueDisplay.textContent = element.value;
            else if (element === shadowInputSlider) shadowInputValueDisplay.textContent = element.value;
            else if (element === midtoneGammaSlider) midtoneGammaValueDisplay.textContent = parseFloat(element.value).toFixed(1);
            else if (element === highlightInputSlider) highlightInputValueDisplay.textContent = element.value;
            else if (element === charSpacingSlider) charSpacingValueDisplay.textContent = element.value;
            else if (element === densityInput) {
                updateDensity(element.value);
                return;
            }
            else if (element === scaleFactorInput) {
                updateScaleFactor(element.value);
                return;
            }
                            else if (element === characterSetSelect) {
                customCharsContainer.style.display = 'flex';
                
                const isLanguage = ['numbers', 'latin_basic', 'latin', 'cyrillic', 'devanagari', 'thai', 'japanese', 'korean', 'chinese', 'arabic'].includes(element.value);
                customCharsInput.disabled = isLanguage;
                customCharsHelpButton.disabled = isLanguage;
                
                if (element.value === 'binary') {
                    customCharsInput.value = '0,1';
                } else if (element.value === 'custom') {
                    customCharsInput.value = '';
                } else if (element.value.startsWith('preset')) {
                    const presetValues = {
                         'preset1': 'ABC', 'preset2': 'A,B,C', 'preset3': '⦁', 'preset4': '●',
                         'preset5': '⬤', 'preset6': '〇', 'preset7': '■', 'preset8': '█', 'preset9': '▃',
                         'preset10': '⯁', 'preset11': '✖', 'preset12': '✚', 'preset13': '╋', 'preset14': '⧸,⧹'
                     };
                    customCharsInput.value = presetValues[element.value] || '';
                } else if (isLanguage) {
                    customCharsInput.value = '';
                }
            }

            else if (element === colorSchemeSelect) {
                syncCustomColorsWithPreset(element.value);
            }
            else if (element === chromaRemovalToggle) {
                isChromaRemovalActive = element.checked;
            }
            else if (element === invertColorsToggle) isInvertColorsActive = element.checked;

            processImageWithCurrentSettings();
            if (element !== previewChangesToggle) {
                 updateInputCanvasPreview();
            }
            
            // Use debounced history saving for sliders to avoid excessive entries
            if (element.tagName === 'INPUT' && element.type === 'range') {
                debouncedSaveSliderToHistory();
            } else if (element.tagName === 'INPUT' && element.type === 'number') {
                // For number inputs, save history immediately since they don't fire continuously
                enableHistoryAfterUserChange();
                setTimeout(() => saveActionToHistory(), 100);
            } else {
                enableHistoryAfterUserChange();
                setTimeout(() => saveActionToHistory(), 100);
            }
        }
    });
}

addSettingsChangeListener(previewChangesToggle, 'change');
addSettingsChangeListener(chromaRemovalToggle, 'change');
addSettingsChangeListener(invertColorsToggle, 'change');
addSettingsChangeListener(contrastSlider);
addSettingsChangeListener(levelsSlider);
addSettingsChangeListener(brightnessSlider);
addSettingsChangeListener(shadowInputSlider);
addSettingsChangeListener(midtoneGammaSlider);
addSettingsChangeListener(highlightInputSlider);
addSettingsChangeListener(charSpacingSlider);
addMobileTouchHandling(contrastSlider);
addMobileTouchHandling(levelsSlider);
addMobileTouchHandling(brightnessSlider);
addMobileTouchHandling(shadowInputSlider);
addMobileTouchHandling(midtoneGammaSlider);
addMobileTouchHandling(highlightInputSlider);
addMobileTouchHandling(charSpacingSlider);
addSettingsChangeListener(densityInput, 'input');
addSettingsChangeListener(scaleFactorInput, 'input');
addSettingsChangeListener(colorSchemeSelect, 'change');
addSettingsChangeListener(fontSelect, 'change');
addSettingsChangeListener(characterSetSelect, 'change');
    addSettingsChangeListener(customCharsInput, 'change');

customCharsInput.addEventListener('input', () => {
    if (characterSetSelect.value !== 'custom') {
        characterSetSelect.value = 'custom';
    }
    clearCachedSequence();
    
    enableHistoryAfterUserChange();
    setTimeout(() => saveActionToHistory(), 100);
});


addSettingsChangeListener(customTextColor, 'input');
addSettingsChangeListener(customBackgroundColor, 'input');

customTextColor.addEventListener('input', () => {
    if (colorSchemeSelect.value !== 'custom') {
        colorSchemeSelect.value = 'custom';
    }
    if (!window.savedCustomColors) window.savedCustomColors = {};
    window.savedCustomColors.text = customTextColor.value;
});

customBackgroundColor.addEventListener('input', () => {
    if (colorSchemeSelect.value !== 'custom') {
        colorSchemeSelect.value = 'custom';
    }
    if (!window.savedCustomColors) window.savedCustomColors = {};
    window.savedCustomColors.background = customBackgroundColor.value;
});

randomSpacingToggle.addEventListener('click', () => {
    isRandomSpacingActive = !isRandomSpacingActive;
    randomSpacingToggle.style.opacity = isRandomSpacingActive ? '1' : '0.6';
    randomSpacingToggle.style.color = isRandomSpacingActive ? 'var(--primary-text)' : '';
    
    clearCachedSequence();
    processImageWithCurrentSettings();
    updateInputCanvasPreview();
    
    enableHistoryAfterUserChange();
    setTimeout(() => saveActionToHistory(), 100);
});

transparentBgToggle.addEventListener('click', () => {
    isBgColorTransparent = !isBgColorTransparent;
    transparentBgToggle.className = isBgColorTransparent ? 'btn-base ri-eye-off-line' : 'btn-base ri-eye-line';
    transparentBgToggle.style.opacity = '0.6';
    customBackgroundColor.disabled = isBgColorTransparent;
    customBackgroundColor.style.opacity = isBgColorTransparent ? '0.3' : '1';
    
    if (colorSchemeSelect.value !== 'custom') {
        colorSchemeSelect.value = 'custom';
    }
    
    clearCachedSequence();
    processImageWithCurrentSettings();
    updateInputCanvasPreview();
    
    enableHistoryAfterUserChange();
    setTimeout(() => saveActionToHistory(), 100);
});

customCharsHelpButton.addEventListener('click', () => {
    alert('Custom Characters:\n\nâ€¢ Using commas randomizes item output (e.g., "A,B,C")\nâ€¢ Using dots flattens items into a sequence (e.g., "ABC.DEF" becomes "ABCDEF")\nâ€¢ Supports all Unicode characters (for unique visual effects)');
});

function updateDensity(newValue) {
    clearCachedSequence();
    let val = parseInt(newValue); const min = parseInt(densityInput.min); const max = parseInt(densityInput.max);
    if (isNaN(val)) val = currentDensity; if (val < min) val = min; if (val > max) val = max;
    densityInput.value = val;
    if (val !== currentDensity) { 
        currentDensity = val; 
        processImageWithCurrentSettings();
        enableHistoryAfterUserChange();
        setTimeout(() => saveActionToHistory(), 100);
    }
}
densityDecrement.addEventListener('click', function() { updateDensity(parseInt(densityInput.value) - 1); });
densityIncrement.addEventListener('click', function() { updateDensity(parseInt(densityInput.value) + 1); });

prevFontButton.addEventListener('click', function() {
    clearCachedSequence();
    let currentIndex = fontSelect.selectedIndex;
    currentIndex = (currentIndex - 1 + availableFonts.length) % availableFonts.length;
    fontSelect.selectedIndex = currentIndex;
    processImageWithCurrentSettings();
    enableHistoryAfterUserChange();
    setTimeout(() => saveActionToHistory(), 100);
});
nextFontButton.addEventListener('click', function() {
    clearCachedSequence();
    let currentIndex = fontSelect.selectedIndex;
    currentIndex = (currentIndex + 1) % availableFonts.length;
    fontSelect.selectedIndex = currentIndex;
    processImageWithCurrentSettings();
    enableHistoryAfterUserChange();
    setTimeout(() => saveActionToHistory(), 100);
});
prevCharSetButton.addEventListener('click', function() {
    clearCachedSequence();
    let currentIndex = characterSetSelect.selectedIndex;
    currentIndex = (currentIndex - 1 + characterSetSelect.options.length) % characterSetSelect.options.length;
    characterSetSelect.selectedIndex = currentIndex;
    characterSetSelect.dispatchEvent(new Event('change'));
});
nextCharSetButton.addEventListener('click', function() {
    clearCachedSequence();
    let currentIndex = characterSetSelect.selectedIndex;
    currentIndex = (currentIndex + 1) % characterSetSelect.options.length;
    characterSetSelect.selectedIndex = currentIndex;
    characterSetSelect.dispatchEvent(new Event('change'));
});


function updateScaleFactor(newValue) {
    clearCachedSequence();
    let val = parseFloat(newValue); const min = parseFloat(scaleFactorInput.min); const max = parseFloat(scaleFactorInput.max);
    if (isNaN(val)) val = currentScaleFactor; if (val < min) val = min; if (val > max) val = max;
    scaleFactorInput.value = val.toFixed(1);
    if (val !== currentScaleFactor) { 
        currentScaleFactor = val; 
        processImageWithCurrentSettings();
        enableHistoryAfterUserChange();
        setTimeout(() => saveActionToHistory(), 100);
    }
}
scaleFactorDecrement.addEventListener('click', function() { updateScaleFactor(parseFloat(scaleFactorInput.value) - 0.5); });
scaleFactorIncrement.addEventListener('click', function() { updateScaleFactor(parseFloat(scaleFactorInput.value) + 0.5); });

prevColorSchemeButton.addEventListener('click', function() {
    clearCachedSequence();
    let currentIndex = colorSchemeSelect.selectedIndex;
    currentIndex = (currentIndex - 1 + colorSchemeSelect.options.length) % colorSchemeSelect.options.length;
    colorSchemeSelect.selectedIndex = currentIndex;
    syncCustomColorsWithPreset(colorSchemeSelect.value);
    processImageWithCurrentSettings();
    enableHistoryAfterUserChange();
    setTimeout(() => saveActionToHistory(), 100);
});
nextColorSchemeButton.addEventListener('click', function() {
    clearCachedSequence();
    let currentIndex = colorSchemeSelect.selectedIndex;
    currentIndex = (currentIndex + 1) % colorSchemeSelect.options.length;
    colorSchemeSelect.selectedIndex = currentIndex;
    syncCustomColorsWithPreset(colorSchemeSelect.value);
    processImageWithCurrentSettings();
    enableHistoryAfterUserChange();
    setTimeout(() => saveActionToHistory(), 100);
});

inputCanvas.addEventListener('click', () => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile && isVideoInput && isPreviewChangesActive && inputCanvas.style.display !== 'none') {
        previewChangesToggle.checked = false;
        isPreviewChangesActive = false;
        updateInputCanvasPreview();
        
        if (inputVideo.paused) {
            inputVideo.play();
        }
    }
});

uploadZone.addEventListener('dragover', (e) => { 
    e.preventDefault(); 
    uploadZone.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--hover-grey'); 
});
uploadZone.addEventListener('dragleave', () => { 
    uploadZone.style.backgroundColor = 'transparent';
});
uploadZone.addEventListener('drop', (e) => {
    e.preventDefault(); 
    uploadZone.style.backgroundColor = 'transparent';
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      handleImageUpload(file);
      condensedUploadZone.style.display = 'inline-block';
      condensedFilename.innerHTML = `<i class="ri-check-line"></i> ${file.name} `;
       if(uploadPanelTitle) uploadPanelTitle.style.display = 'block';
    } else { alert('Please drop an image or video file.'); }
});

condensedUploadZone.addEventListener('dragover', (e) => { e.preventDefault(); condensedUploadZone.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--hover-grey'); });
condensedUploadZone.addEventListener('dragleave', () => { condensedUploadZone.style.backgroundColor = 'transparent';});
condensedUploadZone.addEventListener('drop', (e) => {
    e.preventDefault(); condensedUploadZone.style.backgroundColor = 'transparent';
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      handleImageUpload(file);
      condensedFilename.innerHTML = `<i class="ri-check-line"></i> ${file.name} `;
      if(uploadPanelTitle) uploadPanelTitle.style.display = 'block';
    } else { alert('Please drop an image or video file.'); }
});


function generateRandomHash(length = 8) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += latinBasicChars.charAt(Math.floor(Math.random() * latinBasicChars.length));
    }
    return result;
}

function downloadPng() {
    if (!outputCanvas || !currentBlobMatrix) return;
    const randomHash = generateRandomHash(8);
    const imgData = outputCanvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = imgData; link.download = `Glyphtrix_image_${randomHash}.png`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
}
function downloadText() {
  if (currentBlobMatrix) {
    const randomHash = generateRandomHash(8);
    let textToDownload = currentBlobMatrix.map(row => row.map(cell => cell.char).join('')).join('\n');
    const blob = new Blob([textToDownload], { type: "text/plain;charset=utf-8" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); link.download = `Glyphtrix_image_${randomHash}.txt`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  }
}
   function openNewTab() {
   if (!outputCanvas || !currentBlobMatrix) return;
   
   outputCanvas.toBlob((blob) => {
       if (blob) {
           const blobUrl = URL.createObjectURL(blob);
           const newTab = window.open(blobUrl, '_blank');
           
           newTab.addEventListener('beforeunload', () => {
               URL.revokeObjectURL(blobUrl);
           });
       }
   }, 'image/png');
   }
   function openGitHub() {
    window.open('https://github.com/LandoNikko/Glyphtrix', '_blank');
}

async function loadExampleImage() {
    try {
        loadingSpinner.style.display = 'inline';
        if (mobileLoadingSpinner) mobileLoadingSpinner.style.display = 'inline';
        showUploadSpinner();
        
        const response = await fetch('https://i.imgur.com/6oBu9XC.jpeg');
        if (!response.ok) throw new Error('Failed to fetch example image');
        
        const blob = await response.blob();
        const file = new File([blob], 'example-image.jpeg', { type: 'image/jpeg' });
        
        handleImageUpload(file);
        
        setTimeout(() => {
            scaleFactorInput.value = '2.0';
            currentScaleFactor = 2.0;
            processImageWithCurrentSettings();
        }, 100);
        
        condensedUploadZone.style.display = 'inline-block';
        condensedFilename.innerHTML = `<i class="ri-check-line"></i> example-image.jpeg`;
        if(uploadPanelTitle) uploadPanelTitle.style.display = 'block';
    } catch (error) {
        console.error('Error loading example image:', error);
        alert('Failed to load example image. Please try again.');
    } finally {
        loadingSpinner.style.display = 'none';
        if (mobileLoadingSpinner) mobileLoadingSpinner.style.display = 'none';
        hideUploadSpinner();
    }
}

async function loadExampleVideo() {
    try {
        loadingSpinner.style.display = 'inline';
        if (mobileLoadingSpinner) mobileLoadingSpinner.style.display = 'inline';
        showUploadSpinner();
        
        const videoUrls = [
            'https://i.imgur.com/92mxH3N.mp4',
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'
        ];
        
        let response = null;
        let videoUrl = null;
        
        for (const url of videoUrls) {
            try {
                response = await fetch(url);
                if (response.ok) {
                    videoUrl = url;
                    break;
                }
            } catch (e) {
                continue;
            }
        }
        
        if (!response || !response.ok) {
            throw new Error('All video sources are unavailable');
        }
        
        const blob = await response.blob();
        const file = new File([blob], 'example-video.mp4', { type: 'video/mp4' });
        
        handleImageUpload(file);
        condensedUploadZone.style.display = 'inline-block';
        condensedFilename.innerHTML = `<i class="ri-check-line"></i> example-video.mp4`;
        if(uploadPanelTitle) uploadPanelTitle.style.display = 'block';
    } catch (error) {
        console.error('Error loading example video:', error);
        let errorMessage = 'Failed to load example video. ';
        if (error.message.includes('CORS')) {
            errorMessage += 'This is likely due to CORS restrictions when deployed online. ';
        } else if (error.message.includes('network')) {
            errorMessage += 'Network error occurred. ';
        }
        errorMessage += 'Please try uploading your own video file instead.';
        alert(errorMessage);
    } finally {
        loadingSpinner.style.display = 'none';
        if (mobileLoadingSpinner) mobileLoadingSpinner.style.display = 'none';
        hideUploadSpinner();
    }
}

function hideExampleButtons() {
    const exampleButtonsContainer = document.getElementById('exampleButtonsContainer');
    if (exampleButtonsContainer) {
        exampleButtonsContainer.style.display = 'none';
    }
    
    const mobilePreviewContent = document.getElementById('mobilePreviewContent');
    if (mobilePreviewContent) {
        const mobileExampleButtons = mobilePreviewContent.querySelector('.example-buttons-container');
        if (mobileExampleButtons) {
            mobileExampleButtons.style.display = 'none';
        }
    }
}

function showExampleButtons() {
    const exampleButtonsContainer = document.getElementById('exampleButtonsContainer');
    if (exampleButtonsContainer) {
        exampleButtonsContainer.style.display = 'flex';
    }
}

function showUploadSpinner() {
    const uploadZone = document.getElementById('uploadZone');
    const uploadSpinner = document.getElementById('uploadSpinner');
    if (uploadZone && uploadSpinner) {
        uploadSpinner.innerHTML = getSpinner(48);
        uploadZone.classList.add('loading');
    }
}

function hideUploadSpinner() {
    const uploadZone = document.getElementById('uploadZone');
    if (uploadZone) {
        uploadZone.classList.remove('loading');
    }
}

function resetUploadState() {
    stopVideoProcessingLoop();
    clearCachedSequence();
    isVideoInput = false;
    currentMediaElement = null;
    originalPixelData = null;
    currentBlobMatrix = null;
    
    inputVideo.style.display = 'none';
    inputVideo.pause();
    inputVideo.src = "";
    inputCanvas.style.display = 'none';
    uploadZone.style.display = 'flex';
    
    showExampleButtons();
    
    condensedUploadZone.style.display = 'none';
    if(uploadPanelTitle) uploadPanelTitle.style.display = 'none';
    
    outputCanvas.width = 1;
    outputCanvas.height = 1;
    outputCtx.clearRect(0, 0, 1, 1);
    
    if(gridSizeDisplay) gridSizeDisplay.textContent = '-';
    if(outputResolutionDisplay) outputResolutionDisplay.textContent = '-';
    
    setDownloadButtonsState(true);
    updatePngSequenceButtonState();
    
    if(chromaRemovalContainer) chromaRemovalContainer.style.display = 'none';
    if(invertColorsContainer) invertColorsContainer.style.display = 'none';
    if(previewChangesContainer) previewChangesContainer.style.display = 'none';
    
    setDefaultValues();
    
    if (window.innerWidth <= 768 && mobilePreviewActive) {
        debouncedUpdateMobilePreview();
    }
    
    actionHistory = [];
    currentHistoryIndex = -1;
    updateUndoRedoButtons();
    
    if (sliderChangeTimeout) {
        clearTimeout(sliderChangeTimeout);
        sliderChangeTimeout = null;
    }
}

function openInfoModal() {
    document.getElementById('infoModal').style.display = 'flex';
}

function closeInfoModal() {
    document.getElementById('infoModal').style.display = 'none';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}



function getVideoMetadata() {
    if (!inputVideo) return {};

    // Calculate optimized output based on current density and scale settings
    const density = parseInt(densityInput.value) || 7;
    const outputCols = Math.ceil(inputVideo.videoWidth / density);
    const outputRows = Math.ceil(inputVideo.videoHeight / density);
    const scaleFactor = parseFloat(scaleFactorInput.value) || 1;
    const charSize = 8 * scaleFactor;
    const outputWidth = outputCols * charSize;
    const outputHeight = outputRows * charSize;

    return {
        duration: inputVideo.duration ? formatDuration(inputVideo.duration) : 'Unknown',
        outputResolution: `${Math.round(outputWidth)} Ã— ${Math.round(outputHeight)}`
    };
}

function calculateEstimatedFrames(fps) {
    if (!inputVideo || !inputVideo.duration) return 0;
    return Math.floor(inputVideo.duration * fps);
}

function populateVideoMetadata() {
    const metadataContainer = document.getElementById('videoMetadata');
    if (!metadataContainer) return;

    const metadata = getVideoMetadata();
    
    metadataContainer.innerHTML = `
        <div class="metadata-grid">
            <div class="metadata-item">
                <span class="metadata-label">Duration</span>
                <span class="metadata-value">${metadata.duration}</span>
            </div>
            <div class="metadata-item">
                <span class="metadata-label">Resolution
                    <span style="display: inline-flex; gap: 6px; margin-left: 8px;">
                        <button class="btn-base" id="modalScaleDecrement" style="padding: 2px 6px;">-</button>
                        <button class="btn-base" id="modalScaleIncrement" style="padding: 2px 6px;">+</button>
                    </span>
                </span>
                <span class="metadata-value"><span id="modalResolutionValue">${metadata.outputResolution}</span></span>
            </div>
        </div>
    `;

    const modalScaleDecrement = document.getElementById('modalScaleDecrement');
    const modalScaleIncrement = document.getElementById('modalScaleIncrement');
    if (modalScaleDecrement) {
        modalScaleDecrement.addEventListener('click', (e) => {
            e.stopPropagation();
            updateScaleFactor(parseFloat(scaleFactorInput.value) - 0.5);
            populateVideoMetadata();
        });
    }
    if (modalScaleIncrement) {
        modalScaleIncrement.addEventListener('click', (e) => {
            e.stopPropagation();
            updateScaleFactor(parseFloat(scaleFactorInput.value) + 0.5);
            populateVideoMetadata();
        });
    }
}

function populateFpsOptions() {
    const fpsOptionsGrid = document.getElementById('fpsOptionsGrid');
    if (!fpsOptionsGrid) return;

    const fpsOptions = [
        { fps: 1, label: '1 FPS' },
        { fps: 2, label: '2 FPS' },
        { fps: 5, label: '5 FPS' },
        { fps: 24, label: '24 FPS' },
        { fps: 25, label: '25 FPS' },
        { fps: 30, label: '30 FPS' }
    ];

    fpsOptionsGrid.innerHTML = '';

    fpsOptions.forEach(option => {
        const estimatedFrames = calculateEstimatedFrames(option.fps);
        
        const button = document.createElement('button');
        button.className = 'fps-option-button';
        button.onclick = () => downloadPngSequenceWithFps(option.fps);

        button.innerHTML = `
            <div class="fps-number"><i class="ri-download-2-line"></i> ${option.label}</div>
            <div class="fps-description">${estimatedFrames.toLocaleString()} frames</div>
        `;

        fpsOptionsGrid.appendChild(button);
    });
    
    populateVideoMetadata();
}

function openFpsModal() {
    if (!isVideoInput || inputVideo.readyState < inputVideo.HAVE_METADATA || isSequenceRendering) return;
    populateFpsOptions();
    document.getElementById('fpsModal').style.display = 'flex';
}

function closeFpsModal() {
    document.getElementById('fpsModal').style.display = 'none';
}

// Close modal
document.addEventListener('click', function(event) {
    const infoModal = document.getElementById('infoModal');
    const fpsModal = document.getElementById('fpsModal');
    if (event.target === infoModal) {
        closeInfoModal();
    }
    if (event.target === fpsModal) {
        closeFpsModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeInfoModal();
        closeFpsModal();
    }
});

function layoutPanels() {
    const isMobile = window.innerWidth <= 768;
    const isMediumScreen = window.innerWidth >= 769 && window.innerWidth <= 1600;
    const isDesktop = window.innerWidth >= 1601;
    
    desktopSettingsPanelContainer.style.display = isMobile ? 'none' : 'flex';
    mobileUploadPanelPlaceholder.style.display = isMobile ? 'flex' : 'none';
    mobileSettingsPanel.style.display = isMobile ? 'flex' : 'none';
    mobileDownloadPanelPlaceholder.style.display = isMobile ? 'flex' : 'none';

    if (isMobile) {
        if (uploadPanelContent.parentNode !== mobileUploadPanelPlaceholder) mobileUploadPanelPlaceholder.appendChild(uploadPanelContent);
        if (settingsTitleSection.parentNode !== mobileSettingsPanel) mobileSettingsPanel.appendChild(settingsTitleSection);
        if (imageSettingsContent.parentNode !== mobileSettingsPanel) mobileSettingsPanel.appendChild(imageSettingsContent);
        if (fontSettingsContent.parentNode !== mobileSettingsPanel) mobileSettingsPanel.appendChild(fontSettingsContent);
        if (outputSettingsContent.parentNode !== mobileSettingsPanel) mobileSettingsPanel.appendChild(outputSettingsContent);
        if (downloadPanelContent.parentNode !== mobileDownloadPanelPlaceholder) mobileDownloadPanelPlaceholder.appendChild(downloadPanelContent);
        
        // Let CSS handle mobile layout
        mainContainer.style.height = '';
    } else {
        desktopSettingsPanelContainer.appendChild(uploadPanelContent);
        desktopSettingsPanelContainer.appendChild(settingsTitleSection);
        desktopSettingsPanelContainer.appendChild(imageSettingsContent);
        desktopSettingsPanelContainer.appendChild(fontSettingsContent);
        desktopSettingsPanelContainer.appendChild(outputSettingsContent);
        desktopSettingsPanelContainer.appendChild(downloadPanelContent);
        
        if (isMediumScreen) {
            mainContainer.style.height = '';
            mainContainer.style.maxHeight = '';
        } else if (isDesktop) {
            requestAnimationFrame(() => {
                const desktopHeight = desktopSettingsPanelContainer.offsetHeight || 200;
                const minContainerHeight = Math.min(window.innerHeight - desktopHeight, window.innerHeight * 0.6);
                mainContainer.style.height = `${Math.max(minContainerHeight, 600)}px`;
                mainContainer.style.maxHeight = `calc(100vh - ${desktopHeight}px)`;
            });
        }
    }
}




let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 768) {
                destroyMobilePreview();
            }
            
        layoutPanels();
            
            if (window.innerWidth <= 768) {
                initMobilePreview();
            }
            
        if (currentMediaElement || originalPixelData) {
            setTimeout(() => {
                processImageWithCurrentSettings();
                if (!isVideoInput) updateInputCanvasPreview();
            }, 100);
        }
    }, 300);
});

function scrambleText(element, originalText, duration = 250) {
    if (element.dataset.scrambling === 'true') return;
    
    element.dataset.scrambling = 'true';
    element.classList.add('scrambling');
    
    const uniqueChars = [...new Set(originalText.split(''))].filter(char => char !== ' ');
    const steps = 8;
    const stepDuration = duration / steps;
    let currentStep = 0;
    
    const scrambleInterval = setInterval(() => {
        if (currentStep < steps * 0.6) {
            const scrambled = originalText.split('').map((char, index) => {
                if (char === ' ') return ' ';
                if (Math.random() < 0.4) {
                    return uniqueChars[Math.floor(Math.random() * uniqueChars.length)];
                }
                return char;
            }).join('');
            element.textContent = scrambled;
        } else {
            const progress = (currentStep - steps * 0.6) / (steps * 0.4);
            const restored = originalText.split('').map((char, index) => {
                if (char === ' ') return ' ';
                if (Math.random() < progress * 0.8) {
                    return char;
                }
                return uniqueChars[Math.floor(Math.random() * uniqueChars.length)];
            }).join('');
            element.textContent = restored;
        }
        
        currentStep++;
        
        if (currentStep >= steps) {
            clearInterval(scrambleInterval);
            element.textContent = originalText;
            element.classList.remove('scrambling');
            element.dataset.scrambling = 'false';
        }
    }, stepDuration);
}

// Mobile preview panel functionality
let mobilePreviewActive = false;
let currentMobileView = 'input';

function initMobilePreview() {
    if (window.innerWidth > 768) return;
    
    const mobilePreviewPanel = document.getElementById('mobilePreviewPanel');
    const mobilePreviewSpacer = document.getElementById('mobilePreviewSpacer');
    const mobileInputToggle = document.getElementById('mobileInputToggle');
    const mobileOutputToggle = document.getElementById('mobileOutputToggle');
    const inputColumn = document.getElementById('inputColumn');
    const outputColumn = document.getElementById('outputColumn');
    
    if (!mobilePreviewPanel || !mobilePreviewSpacer) return;
    
    // Activate mobile preview by default
    mobilePreviewPanel.classList.add('active');
    mobilePreviewSpacer.classList.add('active');
    mobilePreviewActive = true;
    
    if (inputColumn) inputColumn.style.display = 'none';
    if (outputColumn) outputColumn.style.display = 'none';
    
    if (mobileInputToggle) {
        mobileInputToggle.addEventListener('click', () => switchMobileView('input'));
    }
    if (mobileOutputToggle) {
        mobileOutputToggle.addEventListener('click', () => switchMobileView('output'));
    }
    
    if (currentMediaElement) {
        currentMobileView = 'output';
        if (mobileInputToggle) mobileInputToggle.classList.remove('active');
        if (mobileOutputToggle) mobileOutputToggle.classList.add('active');
    } else {
        currentMobileView = 'input';
        if (mobileInputToggle) mobileInputToggle.classList.add('active');
        if (mobileOutputToggle) mobileOutputToggle.classList.remove('active');
    }
    
    updateMobilePreviewContent();
}

function switchMobileView(view) {
    if (currentMobileView === view) return;
    
    currentMobileView = view;
    
    const mobileInputToggle = document.getElementById('mobileInputToggle');
    const mobileOutputToggle = document.getElementById('mobileOutputToggle');
    
    if (mobileInputToggle && mobileOutputToggle) {
        mobileInputToggle.classList.toggle('active', view === 'input');
        mobileOutputToggle.classList.toggle('active', view === 'output');
    }
    
    const mobilePreviewContent = document.getElementById('mobilePreviewContent');
    if (mobilePreviewContent) {
        mobilePreviewContent.innerHTML = '';
    }
    updateMobilePreviewContent();
}

let mobilePreviewUpdateTimeout;
function debouncedUpdateMobilePreview() {
    clearTimeout(mobilePreviewUpdateTimeout);
    mobilePreviewUpdateTimeout = setTimeout(() => {
        if (window.innerWidth <= 768 && mobilePreviewActive) {
            updateMobilePreviewContent();
        }
    }, 50);
}

function forceUpdateMobileOutputCanvas() {
    if (window.innerWidth <= 768 && mobilePreviewActive && currentMobileView === 'output') {
        const mobilePreviewContent = document.getElementById('mobilePreviewContent');
        if (mobilePreviewContent) {
            const existingContent = mobilePreviewContent.firstElementChild;
            if (existingContent && existingContent.tagName === 'CANVAS') {
                const outputCanvas = document.getElementById('outputCanvas');
                if (outputCanvas && currentBlobMatrix && currentBlobMatrix.length > 0) {
                    if (existingContent.width !== outputCanvas.width || existingContent.height !== outputCanvas.height) {
                        existingContent.width = outputCanvas.width;
                        existingContent.height = outputCanvas.height;
                    }
                    const ctx = existingContent.getContext('2d');
                    ctx.clearRect(0, 0, existingContent.width, existingContent.height);
                    ctx.drawImage(outputCanvas, 0, 0);
                }
            }
        }
    }
}

function syncMobileVideoTime() {
    if (!mobilePreviewActive || window.innerWidth > 768 || currentMobileView !== 'input' || !isVideoInput) return;
    
    const mobilePreviewContent = document.getElementById('mobilePreviewContent');
    if (!mobilePreviewContent) return;
    
    const existingContent = mobilePreviewContent.firstElementChild;
    if (existingContent && existingContent.tagName === 'VIDEO') {
        const inputVideo = document.getElementById('inputVideo');
        if (inputVideo && Math.abs(existingContent.currentTime - inputVideo.currentTime) > 0.1) {
            existingContent.currentTime = inputVideo.currentTime;
        }
    }
}

// Track the current mobile video clone globally
window.currentMobileVideoClone = null;
window.currentMobileVideoCloneSeekedHandler = null;
window.inputVideoSeekedHandler = null;

function updateMobilePreviewContent() {
    if (!mobilePreviewActive || window.innerWidth > 768) return;
    
    const mobilePreviewContent = document.getElementById('mobilePreviewContent');
    if (!mobilePreviewContent) return;
    
    // Check if content already exists and is the correct type
    const existingContent = mobilePreviewContent.firstElementChild;
    const shouldUpdate = !existingContent || 
        (currentMobileView === 'input' && existingContent.tagName !== 'VIDEO' && existingContent.tagName !== 'CANVAS' && existingContent.id !== 'mobileUploadZone') ||
        (currentMobileView === 'output' && existingContent.tagName !== 'CANVAS' && !existingContent.style.cssText.includes('placeholder'));
    
    if (!shouldUpdate) {
        if (currentMobileView === 'input' && isVideoInput && existingContent.tagName === 'VIDEO') {
            syncMobileVideoTime();
        } else if (currentMobileView === 'output' && existingContent.tagName === 'CANVAS') {
            const outputCanvas = document.getElementById('outputCanvas');
            if (outputCanvas && currentBlobMatrix && currentBlobMatrix.length > 0) {
                if (existingContent.width !== outputCanvas.width || existingContent.height !== outputCanvas.height) {
                    existingContent.width = outputCanvas.width;
                    existingContent.height = outputCanvas.height;
                }
                const ctx = existingContent.getContext('2d');
                ctx.clearRect(0, 0, existingContent.width, existingContent.height);
                ctx.drawImage(outputCanvas, 0, 0);
            }
        }
        return;
    }
    
    mobilePreviewContent.innerHTML = '';
    
    if (window.currentMobileVideoClone && window.currentMobileVideoCloneSeekedHandler) {
        window.currentMobileVideoClone.removeEventListener('seeked', window.currentMobileVideoCloneSeekedHandler);
        window.currentMobileVideoClone = null;
        window.currentMobileVideoCloneSeekedHandler = null;
    }
    if (window.inputVideoSeekedHandler && document.getElementById('inputVideo')) {
        document.getElementById('inputVideo').removeEventListener('seeked', window.inputVideoSeekedHandler);
        window.inputVideoSeekedHandler = null;
    }

    if (currentMobileView === 'input') {
        const inputCanvas = document.getElementById('inputCanvas');
        const inputVideo = document.getElementById('inputVideo');
        const uploadZone = document.getElementById('uploadZone');
        
        if (isVideoInput && inputVideo && inputVideo.style.display !== 'none') {
            const videoClone = inputVideo.cloneNode(true);
            videoClone.id = 'mobilePreviewVideo';
            videoClone.currentTime = inputVideo.currentTime;
            
            const videoCloneSeekedHandler = () => {
                if (Math.abs(inputVideo.currentTime - videoClone.currentTime) > 0.1) {
                    inputVideo.currentTime = videoClone.currentTime;
                    const seekedEvent = new Event('seeked');
                    inputVideo.dispatchEvent(seekedEvent);
                }
            };
            videoClone.addEventListener('seeked', videoCloneSeekedHandler);
            window.currentMobileVideoClone = videoClone;
            window.currentMobileVideoCloneSeekedHandler = videoCloneSeekedHandler;

            const inputVideoSeekedHandler = () => {
                if (Math.abs(videoClone.currentTime - inputVideo.currentTime) > 0.1) {
                    videoClone.currentTime = inputVideo.currentTime;
                }
            };
            inputVideo.addEventListener('seeked', inputVideoSeekedHandler);
            window.inputVideoSeekedHandler = inputVideoSeekedHandler;

            mobilePreviewContent.appendChild(videoClone);
        } else if (inputCanvas && inputCanvas.style.display !== 'none' && currentMediaElement) {
            const canvasClone = document.createElement('canvas');
            canvasClone.width = inputCanvas.width;
            canvasClone.height = inputCanvas.height;
            const ctx = canvasClone.getContext('2d');
            ctx.drawImage(inputCanvas, 0, 0);
            mobilePreviewContent.appendChild(canvasClone);
        } else if (uploadZone) {
            const uploadClone = uploadZone.cloneNode(true);
            uploadClone.id = 'mobileUploadZone';
            uploadClone.addEventListener('click', (e) => {
                if (e.target.closest('.example-buttons-container')) {
                    return;
                }
                document.getElementById('imageUpload').click();
            });
            mobilePreviewContent.appendChild(uploadClone);

        }
    } else {
        const outputCanvas = document.getElementById('outputCanvas');
        if (outputCanvas && currentBlobMatrix && currentBlobMatrix.length > 0) {
            const canvasClone = document.createElement('canvas');
            canvasClone.width = outputCanvas.width;
            canvasClone.height = outputCanvas.height;
            const ctx = canvasClone.getContext('2d');
            ctx.drawImage(outputCanvas, 0, 0);
            mobilePreviewContent.appendChild(canvasClone);
        } else {
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                display: flex; 
                align-items: center; 
                justify-content: center; 
                height: 200px; 
                color: var(--muted-grey); 
                font-size: 1.2em;
                text-align: center;
            `;
            placeholder.textContent = 'Select "Input" to upload an image or video';
            mobilePreviewContent.appendChild(placeholder);
        }
    }
}

function showDesktopLayout() {
    const inputColumn = document.getElementById('inputColumn');
    const outputColumn = document.getElementById('outputColumn');
    
    if (inputColumn) inputColumn.style.display = 'flex';
    if (outputColumn) outputColumn.style.display = 'flex';
}

function hideMobilePreview() {
    const mobilePreviewPanel = document.getElementById('mobilePreviewPanel');
    const mobilePreviewSpacer = document.getElementById('mobilePreviewSpacer');
    
    if (mobilePreviewPanel) mobilePreviewPanel.classList.remove('active');
    if (mobilePreviewSpacer) mobilePreviewSpacer.classList.remove('active');
}

function destroyMobilePreview() {
    const mobilePreviewPanel = document.getElementById('mobilePreviewPanel');
    const mobilePreviewSpacer = document.getElementById('mobilePreviewSpacer');
    const mobilePreviewContent = document.getElementById('mobilePreviewContent');
    
    if (mobilePreviewContent) {
        mobilePreviewContent.innerHTML = '';
    }
    
    const mobileInputToggle = document.getElementById('mobileInputToggle');
    const mobileOutputToggle = document.getElementById('mobileOutputToggle');
    
    if (currentMediaElement) {
        currentMobileView = 'output';
        if (mobileInputToggle) mobileInputToggle.classList.remove('active');
        if (mobileOutputToggle) mobileOutputToggle.classList.add('active');
    } else {
        currentMobileView = 'input';
        if (mobileInputToggle) mobileInputToggle.classList.add('active');
        if (mobileOutputToggle) mobileOutputToggle.classList.remove('active');
    }
    
    hideMobilePreview();
    showDesktopLayout();
    
    mobilePreviewActive = false;
}

document.addEventListener('DOMContentLoaded', () => {
    loadingSpinner.innerHTML = getSpinner(24);
    if (mobileLoadingSpinner) mobileLoadingSpinner.innerHTML = getSpinner(24);
    const sequenceSpinner = document.getElementById('sequenceLoadingSpinner');
    if (sequenceSpinner) sequenceSpinner.innerHTML = getSpinner(64);
    
    availableFonts.forEach(font => {
        const option = document.createElement('option');
        option.value = font.cssName;
        option.textContent = font.name;
        fontSelect.appendChild(option);
    });
    setDefaultValues();
    if(uploadPanelTitle) uploadPanelTitle.style.display = 'none';
    layoutPanels();
    updatePngSequenceButtonState();
    
    const undoButton = document.getElementById('undoButton');
    const redoButton = document.getElementById('redoButton');
    if (undoButton) undoButton.addEventListener('click', undoAction);
    if (redoButton) redoButton.addEventListener('click', redoAction);
    
    // Reset to Default
    const resetToDefaultText = document.getElementById('resetToDefaultText');
    if (resetToDefaultText) {
        resetToDefaultText.addEventListener('click', () => {
            setDefaultValues();
            
            processImageWithCurrentSettings();
            if (!isVideoInput) updateInputCanvasPreview();
            
            saveActionToHistory();
        });
    }
    
    updateUndoRedoButtons();
    
    setTimeout(() => {
        if (window.innerWidth <= 768) {
            initMobilePreview();
        } else {
            showDesktopLayout();
        }
    }, 100);
    
    syncCustomColorsWithPreset('color1');
    

    const glyphtrixLogo = document.getElementById('glyphtrixLogo');
    if (glyphtrixLogo) {
        glyphtrixLogo.addEventListener('mouseenter', () => {
            scrambleText(glyphtrixLogo, 'GLYPHTRIX');
        });
        glyphtrixLogo.addEventListener('click', () => {
            location.reload();
        });
    }
    
    if (window.innerWidth > 768) {
        showDesktopLayout();
    }
});
inputCanvas.style.display = 'none';

// Glyph Randomizer
function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

function getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

function randomizeCustomColors() {
    const originalSliderTimeout = sliderChangeTimeout;
    if (sliderChangeTimeout) {
        clearTimeout(sliderChangeTimeout);
        sliderChangeTimeout = null;
    }

    const wasFileJustLoaded = isFileJustLoaded;
    isFileJustLoaded = true;

    if (colorSchemeSelect) colorSchemeSelect.value = 'custom';

    if (customTextColor && customBackgroundColor) {
        const newTextColor = getRandomColor();
        const newBackgroundColor = getRandomColor();
        customTextColor.value = newTextColor;
        customBackgroundColor.value = newBackgroundColor;
        if (!window.savedCustomColors) window.savedCustomColors = {};
        window.savedCustomColors.text = newTextColor;
        window.savedCustomColors.background = newBackgroundColor;
    }

    processImageWithCurrentSettings();
    if (!isVideoInput) updateInputCanvasPreview();

    setTimeout(() => {
        isFileJustLoaded = wasFileJustLoaded;
        enableHistoryAfterUserChange();
        saveActionToHistory();
    }, 100);
}

function randomizeGlyphSettings() {
    // Temporarily disable automatic history saving to prevent multiple entries
    const originalSliderTimeout = sliderChangeTimeout;
    if (sliderChangeTimeout) {
        clearTimeout(sliderChangeTimeout);
        sliderChangeTimeout = null;
    }
    
    const wasFileJustLoaded = isFileJustLoaded;
    isFileJustLoaded = true;
    
    const charSetSelect = document.getElementById('characterSetSelect');
    if (charSetSelect) {
        charSetSelect.selectedIndex = getRandomIndex(charSetSelect.options.length);
        
        customCharsContainer.style.display = 'flex';
        const isLanguage = ['numbers', 'latin_basic', 'latin', 'cyrillic', 'devanagari', 'thai', 'japanese', 'korean', 'chinese', 'arabic'].includes(charSetSelect.value);
        customCharsInput.disabled = isLanguage;
        customCharsHelpButton.disabled = isLanguage;
        
        if (charSetSelect.value === 'binary') {
            customCharsInput.value = '0,1';
        } else if (charSetSelect.value === 'custom') {
            customCharsInput.value = '';
        } else if (charSetSelect.value.startsWith('preset')) {
            const presetValues = {
                 'preset1': 'ABC', 'preset2': 'A,B,C', 'preset3': '⦁', 'preset4': '●',
                         'preset5': '⬤', 'preset6': '〇', 'preset7': '■', 'preset8': '█', 'preset9': '▃',
                         'preset10': '⯁', 'preset11': '✖', 'preset12': '✚', 'preset13': '╋', 'preset14': '⧸,⧹'
             };
            customCharsInput.value = presetValues[charSetSelect.value] || '';
        } else if (isLanguage) {
            customCharsInput.value = '';
        }
    }
    
    const fontSelect = document.getElementById('fontSelect');
    if (fontSelect) {
        fontSelect.selectedIndex = getRandomIndex(fontSelect.options.length);
    }
    
    const colorSchemeSelect = document.getElementById('colorSchemeSelect');
    if (colorSchemeSelect) {
        colorSchemeSelect.value = 'custom';
        
        const customTextColor = document.getElementById('customTextColor');
        const customBackgroundColor = document.getElementById('customBackgroundColor');
        if (customTextColor && customBackgroundColor) {
            customTextColor.value = getRandomColor();
            customBackgroundColor.value = getRandomColor();
        }
    }
    
    processImageWithCurrentSettings();
    if (!isVideoInput) updateInputCanvasPreview();
    
    // Re-enable history and save the complete randomized state
    setTimeout(() => {
        isFileJustLoaded = wasFileJustLoaded;
        enableHistoryAfterUserChange();
        saveActionToHistory();
    }, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    const glyphRandomizeButton = document.getElementById('glyphRandomizeButton');
    if (glyphRandomizeButton) {
        glyphRandomizeButton.addEventListener('click', function() {
            randomizeGlyphSettings();
            glyphRandomizeButton.classList.remove('dice-animate');
            void glyphRandomizeButton.offsetWidth;
            glyphRandomizeButton.classList.add('dice-animate');
        });
        glyphRandomizeButton.addEventListener('animationend', function() {
            glyphRandomizeButton.classList.remove('dice-animate');
        });
    }

    const customColorsRandomizeButton = document.getElementById('customColorsRandomizeButton');
    if (customColorsRandomizeButton) {
        customColorsRandomizeButton.addEventListener('click', function() {
            randomizeCustomColors();
            customColorsRandomizeButton.classList.remove('dice-animate');
            void customColorsRandomizeButton.offsetWidth;
            customColorsRandomizeButton.classList.add('dice-animate');
        });
        customColorsRandomizeButton.addEventListener('animationend', function() {
            customColorsRandomizeButton.classList.remove('dice-animate');
        });
    }
    
});

