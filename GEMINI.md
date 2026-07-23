---
# Project: pochi-tool.com

## 1. Project Overview
- 실용적인 기능 중심의 다목적 웹 유틸리티 서비스 플랫폼
- 직관적인 사용자 인터페이스(UI)와 빠르고 간편한 웹 도구 경험 제공을 최우선으로 함

## 2. Technical Stack & Rules
- Framework: Next.js / React, TypeScript
- Styling: Tailwind CSS (모바일 퍼스트 반응형, 깔끔한 인터페이스)
- Routing & Redirects: 도메인 리다이렉트(www 등) 및 URL 상태 안전성 유지

## 3. Gemini Agent Working Guidelines
- 새로운 유틸리티 기능 추가 시 컴포넌트 단위로 모듈화하여 독립적으로 관리한다.
- 입력값 검증(Validation) 및 네트워크 예외 처리를 엄격히 적용한다.
- 기존 디자인 시스템의 일관성을 유지하고 핵심 로직에 직관적인 주석을 추가한다.
- 코드 변경 후 테스트 및 동작 확인 절차를 명확히 안내한다.
---
