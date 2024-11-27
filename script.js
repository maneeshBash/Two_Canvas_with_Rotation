const lowerCanvas = document.getElementById("lowerCanvas");
const upperCanvas = document.getElementById("upperCanvas");
const lowerCtx = lowerCanvas.getContext("2d");
const upperCtx = upperCanvas.getContext("2d");

const toggleOverlayBtn = document.getElementById("toggleOverlay");
const rotationRange = document.getElementById("rotationRange");


const canvasWidth = 600;
const canvasHeight = 400;
lowerCanvas.width = canvasWidth;
lowerCanvas.height = canvasHeight;
upperCanvas.width = canvasWidth;
upperCanvas.height = canvasHeight;

const img = new Image();
img.src = "img.png";
img.onload = () => {
    lowerCtx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
};

// Draw rectangles on the upper canvas
const drawRectangles = () => {
    upperCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    upperCtx.fillStyle = "rgba(255, 0, 0, 0.5)";
    upperCtx.fillRect(100, 100, 150, 100);
    upperCtx.fillStyle = "rgba(0, 0, 255, 0.5)";
    upperCtx.fillRect(300, 200, 150, 100);
};
drawRectangles();

// Toggle visibility of the upper canvas
toggleOverlayBtn.addEventListener("click", () => {
    upperCanvas.style.display =
        upperCanvas.style.display === "none" ? "block" : "none";
});

// Rotate both canvases synchronously
const rotateCanvases = (angle) => {
    // Clear and rotate lower canvas
    lowerCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    lowerCtx.save();
    lowerCtx.translate(canvasWidth / 2, canvasHeight / 2);
    lowerCtx.rotate((angle * Math.PI) / 180);
    lowerCtx.translate(-canvasWidth / 2, -canvasHeight / 2);
    lowerCtx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    lowerCtx.restore();

    // Clear and rotate upper canvas
    upperCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    upperCtx.save();
    upperCtx.translate(canvasWidth / 2, canvasHeight / 2);
    upperCtx.rotate((angle * Math.PI) / 180);
    upperCtx.translate(-canvasWidth / 2, -canvasHeight / 2);
    drawRectangles(); // Redraw the rectangles in the rotated position
    upperCtx.restore();
};
rotationRange.addEventListener("input", (e) => {
    const angle = e.target.value;
    rotateCanvases(angle);
});