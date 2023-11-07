const cnv = document.getElementById("cnv");
const ctx = cnv.getContext("2d");
const width = cnv.width = 640;
const height = cnv.height = 640;
const img = ctx.createImageData(width, height);
const imgData = img.data;

const const_g = 0.5;
const k = .8;

let bX = width / 2;
let bY = height / 4;
let bRad = Math.sqrt( Math.sqrt(width*height) / 1.5 );

let mX = 0;
let mY = 0;
let mRad = Math.sqrt( Math.sqrt(width*height) / 1.5 );
let mV = 0;
const mM = .4;

let speedX = 0;
let speedY = 0;

let frame = 0;

function fis_wall_update() {

    speedY = (bY + speedY <= height - mRad && bY + speedY >= mRad) ? speedY + const_g : -speedY*k;
    speedX = (bX + speedX <= width - mRad && bX + speedX >= mRad) ? speedX : -speedX*k;

    bY += speedY;
    bX += speedX;
}

function fis_mouse_update() {
    if (Math.abs(bX - mX) < mRad + bRad && Math.abs(bY - mY) < mRad + bRad) {
        const speed = Math.sqrt(Math.pow(speedX, 2) + Math.pow(speedY, 2)) + mV;
        const hypotenuse = Math.sqrt(Math.pow(bX - mX, 2) + Math.pow(bY - mY, 2));
        speedX = speed * (bX - mX) / hypotenuse;
        speedY = speed * (bY - mY) / hypotenuse;
        mV = 0;
    }
}

function update() {
    for (let i = 0; i < height; i++){
        for (let j = 0; j < width; j++){
            let index = (i + j * width) * 4;
                imgData[index + 0] = 46;
                imgData[index + 1] = 59;
                imgData[index + 2] = 85;
                imgData[index + 3] = 255;
                if (Math.pow((i - bX), 2) + Math.pow((j - bY), 2) <= Math.pow(bRad, 2)) {
                    imgData[index + 0] = 255;
                    imgData[index + 1] = 165;
                    imgData[index + 2] = 0;
                    imgData[index + 3] = 255;
                }
                mPow = Math.pow((i - mX), 2) + Math.pow((j - mY), 2);
                if (Math.pow(mRad, 2) <= mPow && mPow <= Math.pow(mRad, 2)) {
                    imgData[index + 0] = 66;
                    imgData[index + 1] = 170;
                    imgData[index + 2] = 255;
                    imgData[index + 3] = 255;
                }
        }
    }

    fis_wall_update();
    fis_mouse_update();

    ctx.putImageData(img, 0, 0);
    frame++;
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);

cnv.addEventListener('mousemove', (event) => {
    const X0 = mX;
    const Y0 = mY;
    mX = event.clientX;
    mY = event.clientY;
    mV = Math.sqrt( Math.pow(mX - X0, 2) + Math.pow(mY - Y0, 2) ) * mM;
})