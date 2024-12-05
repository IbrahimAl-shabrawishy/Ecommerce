import { Audio } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className=" justify-center items-center flex bg-slate-300 h-screen">
      <Audio
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </div>
  );
}
