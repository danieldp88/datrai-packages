import ChatBot from './Chat'

export default function Chat() {
  return (
    <main className="font-sans">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="rounded-lg lg:col-span-2  bg-[url('/chatbots.jpg')] bg-cover bg-center bg-no-repeat "></div>
        <div className="flex flex-col items-center">
          <ChatBot/>
        </div>
      </div>
    </main>
  )
}
