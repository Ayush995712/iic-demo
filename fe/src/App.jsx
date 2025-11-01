import { useState } from 'react'
import './App.css'

function App() {
  const [visible, setVisible] = useState(true);

  function submit() {
    setVisible(false);
  }

  return (
    <>
      <div>
        <div className="h-screen w-screen flex justify-center items-center box-border bg-black">
            {visible ? (
              <div className="bg-[#C75146] box-border px-16 py-8 rounded-lg text-white flex flex-col gap-2">
                <div className="text-[#F7EDE2] rounded-2xl mb-5 flex justify-center items-center py-2">
                    <h1 className="text-3xl font-bold font-serif">Credentials</h1>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-0.5">
                        <div className="bg-[#F1B5CB] text-[#595358] rounded-md box-border py-1 px-3">Username</div>
                        <div>
                            <input className="bg-[#DEC3BE] rounded-md border text-[#595358] py-1 px-3" type="text"></input>
                        </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <div className="bg-[#F1B5CB] text-[#595358] rounded-md box-border py-1 px-3">Email</div>
                        <div>
                            <input className="bg-[#DEC3BE] rounded-md border text-[#595358] py-1 px-3" type="password"></input>
                        </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <div className="bg-[#F1B5CB] text-[#595358] rounded-md box-border py-1 px-3">Password</div>
                        <div>
                            <input className="bg-[#DEC3BE] rounded-md border text-[#595358] py-1 px-3" type="password"></input>
                        </div>
                    </div>
                    <div className="flex justify-center items-center box-border mt-2">
                        <button className="cursor-pointer bg-[#F1B5CB] text-[#595358] rounded-3xl px-4 py-[5px]" onClick={submit}>Submit</button>
                    </div>
                </div>
              </div>
            ) : (
              <div className='text-amber-50 h-screen w-screen'>
                <h1 className='text-amber-100'>Thank You for submitting your credentials.</h1>
                <button onClick={() => setVisible(true)}>Sign in as Admin</button>
              </div>
            )}
        </div>
      </div>
    </>
  )
}

export default App
