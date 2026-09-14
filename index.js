const ball = document.getElementById('ball');
const container = document.getElementById('ball-container');

ball.ondragstart = function() {
  return false;
};

// центруємо м’яч за координатами (pageX, pageY)
function moveAt(pageX, pageY) {	
	// 1. Получаем глобальные координаты контейнера на странице
  const rect = container.getBoundingClientRect();
  const containerPageX = rect.left + window.scrollX;
  const containerPageY = rect.top + window.scrollY;
	
	let left = pageX - containerPageX - ball.offsetWidth / 2;
	let top = pageY - containerPageY - ball.offsetHeight / 2;

	// 2. Задаем жесткие границы контейнера
  const minLeft = 0;
  const maxLeft = container.offsetWidth - ball.offsetWidth;

  const minTop = 0;
  const maxTop = container.offsetHeight - ball.offsetHeight;

	// 3. Ограничиваем координаты, чтобы они не выходили за рамки [min, max]
  left = Math.max(minLeft, Math.min(left, maxLeft));
  top = Math.max(minTop, Math.min(top, maxTop));
	
  ball.style.left = left + 'px';
  ball.style.top = top + 'px';
}

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);
}

ball.onmousedown = function(event) {
  // (1) підготувати до переміщення: розмістити поверх іншого контенту і в абсолютних координатах
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;

  // перемістимо його з будь-яких поточних батьків безпосередньо в body
  // щоб розташувати його відносно body
  // document.body.append(ball);

  // переносимо наш абсолютно позиціюнованний м’яч під курсор
  moveAt(event.pageX, event.pageY);

  // (2) пересуваємо м’яч на mousemove
  document.addEventListener('mousemove', onMouseMove);
};

// // (3) відпускаємо м’яч, видаляємо непотрібні обробники подій
ball.onmouseup = function() {
  document.removeEventListener('mousemove', onMouseMove);
};
