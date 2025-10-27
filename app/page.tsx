import CounterApp from '@/components/CounterApp'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* 상단 제목 영역 */}
        <div className="text-center mb-8">
          {/* ✅ 학번 + 이름 표시 */}
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            중부대학교 92313403 신지영의 블록체인 카운터 앱
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            MetaMask를 연결하여 스마트 컨트랙트와 상호작용하세요.
          </p>
        </div>

        {/* CounterApp 컴포넌트 */}
        <CounterApp />

        {/* 사용 방법 안내 */}
        <div className="mt-12 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              사용 방법
            </h2>
            <div className="text-left space-y-2 text-gray-600 dark:text-gray-300">
              <p>1. MetaMask 지갑을 설치하고 연결하세요.</p>
              <p>2. "지갑 연결" 버튼을 눌러 MetaMask와 연결하세요.</p>
              <p>3. 카운터 값을 증가, 감소, 리셋할 수 있습니다.</p>
              <p>4. 모든 변경사항은 블록체인에 기록됩니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
