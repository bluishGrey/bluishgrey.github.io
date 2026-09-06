fetch('https://bluishgrey.github.io/bluishJournal.md')
  .then(response => response.text())
  .then(text => {
    document.getElementById('journal-preview').innerHTML = marked.parse(text);
  });

const quotes = [
  "일단 커밋하고 보자",
  "안되면 되게 하라던데 일단 재부팅부터",
  "버그가 아니라 숨겨진 기능",
  "오늘도 스택 하나 쌓음",
  "느려도 멈추지만 말기",
  "천천히 가도 도착은 함",
  "일단 하고 후회하자",
  "작심삼일도 열 번이면 한 달",
  "쉬운 길은 없어도 가는 길은 있음",
  "버티는 것도 스펙",
  "습관이 갑이다",
  "작은 진전도 진전",
  "저널에 한 줄이라도 남기기",
  "고생 끝에 낙 온다는데 일단 커피",
  "포기는 배추 셀 때만",
  "어제보다 딱 한 줄만 더",
  "반복하다 보면 실력 됨",
  "물어보는 거 안 쪽팔림",
  "돌아가면 일단 성공",
  "디버깅은 탐정놀이",
  "오늘 에러가 내일 스펙",
  "계획보다 일단 실행",
  "물음표 자주 던지기",
  "몰입 시간 쌓으면 실력",
  "될 방법부터 찾기",
  "꾸준함이 최고 스펙",
  "쉬는 것도 전략임",
  "오늘의 나 = 어제 나의 결과물",
  "버그 없는 코드는 없음, 못 찾은 버그만 있음",
  "패턴은 언젠가 보임",
  "지금 힘든 거 성장통일지도",
  "한 번에 완벽한 거 없음, 고치면 됨",
  "포기하고 싶을 때가 사실 거의 다 온 때",
  "작은 습관이 큰 변화 만듦",
  "묵묵히 하다 보면 어느새",
  "전역은 온다",
  "시간은 흐른다, 다행히",
  "지금 답답한 것도 나중엔 추억",
  "루틴 잡히면 시간도 잡힘",
  "기다림도 일종의 훈련",
  "제대일은 다가온다",
  "하루 견디기보다 하루 채우기",
  "작은 목표 매일 = 큰 목표 자동완성",
  "지금 루틴이 나중 습관",
  "시간은 공평, 채우는 게 다를 뿐",
  "오늘도 무사히",
  "코드 한 줄, 페이지 한 장, 그렇게 쌓임",
  "졸리면 자고 일어나면 또 하기",
  "너무 애쓰지도, 놓지도 말기",
  "오늘 하루 버틴 것도 충분함",
  "작은 성취 자주 인정해주기",
  "커밋 메시지는 나중의 나를 위한 편지",
  "새로고침하면 또 다른 하루",
  "일단 켜놓고 시작",
  "잘 안되면 커피 한 잔",
  "오늘도 그럭저럭",
  "완벽주의는 내일의 나에게 맡기기",
  "적당히 하는 것도 능력",
  "일단 저지르고 수습",
  "하다 보면 늘어있음",
  "느낌 안 나도 꾸준히"
];
const randomIndex = Math.floor(Math.random() * quotes.length);
document.getElementById('quote-line').innerText = quotes[randomIndex];

// ============================================================
// 시간대 8단계 분기
// ============================================================
const TIME_CLASSES = [
  "night", "astro-dawn", "blue-hour", "dawn",
  "day", "late-afternoon", "golden-hour", "dusk"
];

const STAR_RATIOS = {
  "night": 1.0,
  "astro-dawn": 0.7,
  "blue-hour": 0.4,
  "dawn": 0.1,
  "day": 0,
  "late-afternoon": 0,
  "golden-hour": 0.08,
  "dusk": 0.3
};

function getTimeClass(hour) {
  if (hour >= 20 || hour < 4) return "night";
  if (hour >= 4 && hour < 5) return "astro-dawn";
  if (hour >= 5 && hour < 6) return "blue-hour";
  if (hour >= 6 && hour < 7.5) return "dawn";
  if (hour >= 7.5 && hour < 16) return "day";
  if (hour >= 16 && hour < 17.5) return "late-afternoon";
  if (hour >= 17.5 && hour < 19) return "golden-hour";
  return "dusk"; // 19 ~ 20
}

function applyTimeClass(cls) {
  TIME_CLASSES.forEach(c => document.body.classList.remove(c));
  document.body.classList.add(cls);
  applyStarsForRatio(STAR_RATIOS[cls]);
}

// ============================================================
// 별 생성
// ============================================================
const STAR_COUNT = 80;
let starEls = [];

function createStars() {
  const container = document.createElement('div');
  container.id = 'stars';
  document.body.appendChild(container);

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    const size = (Math.random() * 2 + 1).toFixed(1);
    const top = (Math.random() * 70).toFixed(1);
    const left = (Math.random() * 100).toFixed(1);
    const delay = (Math.random() * 3).toFixed(2);

    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.top = top + 'vh';
    star.style.left = left + '%';
    star.style.animationDelay = delay + 's';

    star.dataset.reveal = Math.random();

    container.appendChild(star);
    starEls.push(star);
  }
}

function applyStarsForRatio(ratio) {
  starEls.forEach(star => {
    const revealAt = parseFloat(star.dataset.reveal);
    if (revealAt < ratio) {
      star.classList.add('on');
    } else {
      star.classList.remove('on');
    }
  });
}

createStars();

// 페이지가 실제로 지금 몇 시인지로 배경 테마를 최초 적용
const nowForTheme = new Date();
const themeHour = nowForTheme.getHours() + nowForTheme.getMinutes() / 60;
applyTimeClass(getTimeClass(themeHour));

function forceTime(hour) {
  applyTimeClass(getTimeClass(hour));
}

// ============================================================
// 필드워치 스타일 시계 다이얼
// - 평소엔 실제 시각을 따라 시침/분침/초침이 계속 움직임
// - 삼각형 손잡이(끝이 베젤 바깥쪽을 향함)를 드래그하면 마우스와
//   1:1로 움직이고 (최대 2바퀴), 드래그 중엔 배경도 그 시간에 맞게 미리보기
// - 손을 떼면 2초 후, 돌린 방향의 정확히 역방향으로 실제 시각·실제 배경까지 복귀
// ============================================================
(function initClock() {
  const svg = document.getElementById('dial-svg');
  const hourHand = document.getElementById('hourHand');
  const minHand = document.getElementById('minHand');
  const secHand = document.getElementById('secHand');
  const grip = document.getElementById('dial-grip');
  const minuteTicks = document.getElementById('minuteTicks');
  const ticks12 = document.getElementById('ticks12');
  const nums12 = document.getElementById('nums12');
  const nums24 = document.getElementById('nums24');
  const timeOut = document.getElementById('dial-time');
  const labelOut = document.getElementById('dial-label');
  const cx = 110, cy = 110;
  const rOuterTick = 95, rOuterNum = 82, rInnerNum = 50;

  function polar(r, deg) {
    const a = (deg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }
  function labelFor(h) {
    const hh = ((h % 24) + 24) % 24;
    return getTimeClass(hh);
  }
  function labelDisplay(cls) {
    const names = {
      "night": "Night", "astro-dawn": "Astro dawn", "blue-hour": "Blue hour",
      "dawn": "Dawn", "day": "Day", "late-afternoon": "Late afternoon",
      "golden-hour": "Golden hour", "dusk": "Dusk"
    };
    return names[cls] || cls;
  }
  function norm360(d) { return ((d % 360) + 360) % 360; }

  // 분 눈금 (시 눈금 사이사이, 5도 간격 = 12시간에 72개, 시 눈금 자리는 건너뜀)
  for (let m = 0; m < 72; m++) {
    const deg = m * 5;
    if (deg % 30 === 0) continue; // 이 자리는 시 눈금이 대신 그림
    const p1 = polar(rOuterTick, deg);
    const p2 = polar(rOuterTick - 3, deg);
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    t.setAttribute('x1', p1.x); t.setAttribute('y1', p1.y);
    t.setAttribute('x2', p2.x); t.setAttribute('y2', p2.y);
    t.setAttribute('stroke', 'currentColor'); t.setAttribute('stroke-width', 0.75);
    t.setAttribute('opacity', '0.3');
    minuteTicks.appendChild(t);
  }

  // 시 눈금/숫자: 바깥 1~12, 안쪽 13~24를 같은 각도에 짝지어 배치
  for (let n = 0; n < 12; n++) {
    const deg = n * 30;
    const isMajor = n % 3 === 0;
    const p1 = polar(rOuterTick, deg);
    const p2 = polar(rOuterTick - (isMajor ? 9 : 5), deg);
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    t.setAttribute('x1', p1.x); t.setAttribute('y1', p1.y);
    t.setAttribute('x2', p2.x); t.setAttribute('y2', p2.y);
    t.setAttribute('stroke', 'currentColor'); t.setAttribute('stroke-width', isMajor ? 2 : 1);
    t.setAttribute('opacity', '0.6');
    ticks12.appendChild(t);

    const outerVal = n === 0 ? 12 : n;
    const np = polar(rOuterNum, deg);
    const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    txt.setAttribute('x', np.x); txt.setAttribute('y', np.y + 4);
    txt.setAttribute('text-anchor', 'middle');
    txt.setAttribute('font-size', '13'); txt.setAttribute('font-weight', '500');
    txt.setAttribute('fill', 'currentColor');
    txt.textContent = outerVal;
    nums12.appendChild(txt);

    const innerVal = outerVal + 12;
    const ip = polar(rInnerNum, deg);
    const itxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    itxt.setAttribute('x', ip.x); itxt.setAttribute('y', ip.y + 3);
    itxt.setAttribute('text-anchor', 'middle');
    itxt.setAttribute('font-size', '9'); itxt.setAttribute('fill', 'currentColor');
    itxt.setAttribute('opacity', '0.55');
    itxt.textContent = innerVal;
    nums24.appendChild(itxt);
  }

  function anglesToClock(continuousAngle) {
    const wrapped = norm360(continuousAngle);
    const totalMinutesIn12h = (wrapped / 360) * 720;
    const hour12 = Math.floor(totalMinutesIn12h / 60);
    const minuteFrac = (totalMinutesIn12h / 60) - hour12;
    const minute = Math.floor(minuteFrac * 60);
    const secondFrac = (minuteFrac * 60) - minute;
    return {
      hourDeg: wrapped, minDeg: minuteFrac * 360, secDeg: secondFrac * 360,
      hour12, minute, second: Math.floor(secondFrac * 60)
    };
  }

  // 삼각형 손잡이: 뾰족한 끝이 바깥쪽에서 안쪽 눈금을 향해 가리키는 방향
  // (뾰족한 끝 ~ 밑변 사이 길이를 기존보다 40% 늘림: 18 -> 25.2)
  function updateGripShape(deg) {
    const tip = polar(rOuterTick - 12.2, deg);
    const baseL = polar(rOuterTick + 13, deg - 3.2);
    const baseR = polar(rOuterTick + 13, deg + 3.2);
    grip.setAttribute('points', `${tip.x},${tip.y} ${baseL.x},${baseL.y} ${baseR.x},${baseR.y}`);
  }

  let realSeconds = (() => {
    const d = new Date();
    return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
  })();
  let mode = 'running';
  let lastTs = null;

  // 지금이 하루의 전반 12시간(0~12시)인지 후반 12시간(12~24시)인지.
  // continuousAngle 자체는 항상 0~360(=0~12시간)만 표현하므로, 이 값이 없으면
  // "몇 시인지"를 절대 정확히 복원할 수 없다. 시계 값이 바뀔 때마다 같이 갱신한다.
  let currentDayHalf = Math.floor(((realSeconds / 3600) % 24) / 12); // 0 또는 1

  let previewContinuousAngle = null;
  let previewDayHalf = null;
  let dragStartAngle = null;
  let dragStartHalf = null;
  let lastMouseAngle = null;
  let isPressed = false;
  let snapTimer = null;
  let snapRAF = null;
  const MAX_ROTATION = 720;

  function realContinuousAngle() {
    const hourOfDay = (realSeconds / 3600) % 24;
    return (hourOfDay % 12) / 12 * 360;
  }

  function drawFromContinuousAngle(continuousAngle, dayHalf) {
    const c = anglesToClock(continuousAngle);

    const hp = polar(50, c.hourDeg);
    hourHand.setAttribute('x2', hp.x.toFixed(1)); hourHand.setAttribute('y2', hp.y.toFixed(1));
    const mp = polar(75, c.minDeg);
    minHand.setAttribute('x2', mp.x.toFixed(1)); minHand.setAttribute('y2', mp.y.toFixed(1));
    const sp = polar(85, c.secDeg);
    secHand.setAttribute('x2', sp.x.toFixed(1)); secHand.setAttribute('y2', sp.y.toFixed(1));

    updateGripShape(c.hourDeg);

    const hourOfDay = (c.hour12 % 12) + dayHalf * 12;
    const hh = hourOfDay.toString().padStart(2, '0');
    const mm = c.minute.toString().padStart(2, '0');
    const ss = c.second.toString().padStart(2, '0');
    timeOut.textContent = `${hh}:${mm}:${ss}`;

    const cls = labelFor(hourOfDay);
    labelOut.textContent = labelDisplay(cls);

    // 드래그(미리보기) 중엔 배경 테마도 그 시간에 맞게 같이 바꿔줌
    if (mode !== 'running') {
      applyTimeClass(cls);
    }
    return hourOfDay;
  }

  function realDraw() {
    currentDayHalf = Math.floor(((realSeconds / 3600) % 24) / 12);
    drawFromContinuousAngle(realContinuousAngle(), currentDayHalf);
  }

  function tickLoop(ts) {
    if (lastTs === null) lastTs = ts;
    const dt = (ts - lastTs) / 1000;
    lastTs = ts;
    if (mode === 'running') {
      realSeconds += dt;
      if (realSeconds >= 24 * 3600) realSeconds -= 24 * 3600;
      realDraw();
      // 평소 흐름 중에도 시간대가 바뀌는 경계를 지나면 배경 갱신
      applyTimeClass(labelFor((realSeconds / 3600) % 24));
    }
    requestAnimationFrame(tickLoop);
  }
  requestAnimationFrame(tickLoop);

  function mouseAngle(evt) {
    const rect = svg.getBoundingClientRect();
    const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
    const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
    const x = clientX - rect.left - cx;
    const y = clientY - rect.top - cy;
    return norm360(Math.atan2(y, x) * 180 / Math.PI + 90);
  }

  // previewContinuousAngle은 드래그 중 "랩핑 없이 그대로 누적된" 각도.
  // 이 값을 360으로 나눈 정수 부분(몇 바퀴 돌았는지)과 드래그 시작 시점의
  // dayHalf를 더하면, 몇 바퀴를 돌았어도 항상 정확한 전/후반을 구할 수 있다.
  function dayHalfFromPreview(continuousAngle) {
    const wholeTurns = Math.floor(continuousAngle / 360);
    return (((dragStartHalf + wholeTurns) % 2) + 2) % 2;
  }

  function startDrag(evt) {
    evt.preventDefault();
    isPressed = true;
    mode = 'manual';
    if (snapTimer) clearTimeout(snapTimer);
    if (snapRAF) cancelAnimationFrame(snapRAF);
    if (previewContinuousAngle === null) {
      previewContinuousAngle = realContinuousAngle();
      dragStartAngle = previewContinuousAngle;
      dragStartHalf = currentDayHalf;
    }
    lastMouseAngle = mouseAngle(evt);
  }

  function onMove(evt) {
    if (!isPressed) return;
    evt.preventDefault();
    const nowAngle = mouseAngle(evt);

    let delta = nowAngle - lastMouseAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    lastMouseAngle = nowAngle;

    let next = previewContinuousAngle + delta;
    next = Math.max(dragStartAngle - MAX_ROTATION, Math.min(dragStartAngle + MAX_ROTATION, next));
    previewContinuousAngle = next;

    drawFromContinuousAngle(previewContinuousAngle, dayHalfFromPreview(previewContinuousAngle));
  }

  function endDrag() {
    if (!isPressed) return;
    isPressed = false;
    snapTimer = setTimeout(() => {
      const startVal = previewContinuousAngle;
      const target = dragStartAngle;
      const startHalf = dayHalfFromPreview(startVal);

      const startTime = performance.now();
      const rotatedAmount = Math.abs(startVal - target);
      const duration = Math.min(2600, 900 + rotatedAmount / 720 * 1800);
      function step(now) {
        const t = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = startVal + (target - startVal) * eased;
        // 복귀 애니메이션 중에도, 지금 지점 기준으로 정확한 전/후반을 계산
        drawFromContinuousAngle(current, dayHalfFromPreview(current));
        if (t < 1) {
          snapRAF = requestAnimationFrame(step);
        } else {
          previewContinuousAngle = null;
          dragStartAngle = null;
          dragStartHalf = null;
          mode = 'running';
          realDraw();
          applyTimeClass(labelFor((realSeconds / 3600) % 24));
        }
      }
      snapRAF = requestAnimationFrame(step);
    }, 2000);
  }

  grip.addEventListener('mousedown', startDrag);
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('mousemove', onMove);
  grip.addEventListener('touchstart', startDrag, { passive: false });
  window.addEventListener('touchend', endDrag);
  window.addEventListener('touchmove', onMove, { passive: false });

  realDraw();
})();
