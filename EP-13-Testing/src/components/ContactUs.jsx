const ContactUs = () => {
    return(
        <>
            <div className="w-full max-w-xl mx-auto p-2 sm:p-4 text-center text-xl">Contact Us</div>
            <form className="flex justify-center items-center flex-col">
                <div>
                    <label>Name</label>
                    <input className="border border-black p-2 m-2 rounded-lg focus:border-blue-500" type="text" id="name"/>
                </div>
                <div>
                    <label>Email</label>
                    <input className="border border-black p-2 m-2 rounded-lg focus:border-blue-500" type="email" id="email"/>
                </div>
                <div>
                    <label>Message</label>
                    <textarea className="border border-black p-2 m-2 rounded-lg focus:border-blue-500" rows={2}/>
                </div>
                <div>
                   <button className="rounded-lg p-2 m-2 bg-slate-500" type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}

export default ContactUs;