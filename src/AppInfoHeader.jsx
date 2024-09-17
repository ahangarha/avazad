import { APP_NAME } from './constants'

export default function AppInfoHeader() {
  return (
    <header className="px-4 py-8 bg-rose-800 text-center">
      <h1 className="font-black text-4xl">{APP_NAME}</h1>
      <p>
        ابزاری برای تسهیل پردازش متن انبوه برای وارد کردن به پروژهٔ
        <br />
        <a href="https://commonvoice.mozilla.org/fa" className="underline" target="_blank" rel="noopener noreferrer">
          آوای مشترک موزیلا
        </a>
      </p>
    </header>
  )
}
