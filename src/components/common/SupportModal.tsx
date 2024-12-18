import { SupportModalProps } from '@/components/result/config/types'

const SupportModal: React.FC<SupportModalProps> = ({ open, onClose }) => {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">支持我们</h3>
          <img
            src="/images/wechatmoneyreceiveQRcode.jpg"
            alt="微信收款码"
            className="mx-auto max-w-[200px] mb-4 rounded-lg"
          />
          <p className="text-sm text-gray-600 mb-6">
            感谢您的支持！您的鼓励是我们持续改进的动力。
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

export default SupportModal
