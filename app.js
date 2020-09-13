const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

//초기 색상과 캔버스 크기를 정해준다
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

//위에서 정한 값을 캔버스 가로 세로값에 대입해준다
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//canvas 배경을 white로 초기화 해준다
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

//선과 배경을 칠할 색상을 초기 색상으로 저장해준 후
//선의 두께를 초기화 해준다
ctx.strokeStyle = "INITIAL_COLOR";
ctx.fillStyle = "INITIAL_COLOR";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

//마우스 이동에 따라 좌표계 값을 변수에 저장한다
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  //보이지 않지만 path를 만들고 있음
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
  //moveTo의 위치부터 현재위치인 lineTo의 위치로 선이 그려짐
  else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

//색상을 클릭하면 해상 색상의 정보를 가져와 저장하고
//캔버스의 선과 배경을 칠할 색상에 대입해준다
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

//현재 선의 두께정보를 가져와서 두께를 새롭게 업데이트 해준다
function handleRangeChange(event) {
  const stroke = event.target.value;
  ctx.lineWidth = stroke;
}

//클릭 이벤트에 따라서 선을 칠할것인지 배경에 색상을 채울것인지 선택한다
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

//배경을 채우는 상태가 참일 경우에만 캔버스를 클릭하면 배경색이 채워진다
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

//시스템에 내제되어있는 기본 기능 부분을 다루는 함수
function handleCM(event) {
  //우클릭 방지를 위해 클릭 이벤트시 아무것도 하지 않는 임시 함수 삽입
  event.preventDefault();
}

//저장 버튼을 누르면 캔버스에 그려진 그림을 url형태로 가져오고 포맷은 png이다
//a태그를 만들어서 링크를 넣어주고 다운로드시 이미지 파일명을 저장한다
//가져온 다운로드 링크 정보를 자동으로 클릭하게 하여 다운로드가 시작된다
function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "MyPaint";
  link.click();
}

//캔버스의 이벤트를 처리할 조건문
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

//colors객체 안에 있는 배열로 묶어준 후
//각각의 색상에 클릭 이벤트가 발생하면 넘겨주는 이벤트
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

//범위의 이벤트를 처리할 조건문
if (range) {
  range.addEventListener("input", handleRangeChange);
}

//칠할 모드의 이벤트를 처리할 조건문
if (mode) {
  mode.addEventListener("click", handleModeClick);
}

//저장버튼의 이벤트를 처리할 조건문
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
