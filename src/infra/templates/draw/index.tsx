import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { PostService } from '@/infra/api/post';

const DrawTemplate = () => {
const { push } = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const [contextRef, setContextRef] = useState<CanvasRenderingContext2D>();
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000')
  const [width, setWidth] = useState('6');

  const uploadCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    await PostService.createPost(dataURItoBlob(canvas.toDataURL()));
    push('home')
    
  }

  const dataURItoBlob = (dataURI: string) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
    }
  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = 500;
      canvas.height = 500;

      const context = canvas.getContext("2d");
      if (!context) return;
      context.lineCap = "round";
      context.strokeStyle = "black";
      context.lineWidth = 5;
      setContextRef(context);
  }, []);

  const startDrawing = (nativeEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      const {offsetX, offsetY} = nativeEvent.nativeEvent;
      contextRef?.beginPath();
      contextRef?.moveTo(offsetX, offsetY);
      contextRef?.lineTo(offsetX, offsetY);
      
      if (contextRef) {
        contextRef.lineWidth = parseInt(width);
        contextRef.strokeStyle = color;
      }
      contextRef?.stroke();
      setIsDrawing(true);
      nativeEvent.preventDefault();
  };

  const draw = (nativeEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    console.log(contextRef)
      if(!isDrawing) {
          return;
      }
      
      const {offsetX, offsetY} = nativeEvent.nativeEvent;
      contextRef?.lineTo(offsetX, offsetY);
      contextRef?.stroke();
      nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
      contextRef?.closePath();
      setIsDrawing(false);
  };


  return (
    <>
    <div
        onClick={() => push('home')}
        className='absolute left-10 top-10 cursor-pointer hover:bg-[#ffffff2a] ease-in-out duration-150 h-14 w-14 rounded-full flex justify-center flex-col'>
        <svg className='mx-auto' width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.1699 24C11.0383 24.0007 10.9078 23.9755 10.786 23.9257C10.6641 23.876 10.5533 23.8027 10.4599 23.71L2.28989 15.54C1.82426 15.0755 1.45483 14.5238 1.20277 13.9163C0.950701 13.3089 0.820953 12.6577 0.820953 12C0.820953 11.3423 0.950701 10.6911 1.20277 10.0837C1.45483 9.4762 1.82426 8.92445 2.28989 8.45999L10.4599 0.290002C10.5531 0.196764 10.6638 0.122803 10.7856 0.0723425C10.9075 0.0218822 11.038 -0.00408935 11.1699 -0.00408936C11.3018 -0.00408936 11.4323 0.0218822 11.5541 0.0723425C11.676 0.122803 11.7867 0.196764 11.8799 0.290002C11.9731 0.38324 12.0471 0.49393 12.0976 0.615752C12.148 0.737574 12.174 0.868142 12.174 1C12.174 1.13186 12.148 1.26243 12.0976 1.38425C12.0471 1.50607 11.9731 1.61676 11.8799 1.71L3.70989 9.87999C3.14809 10.4425 2.83253 11.205 2.83253 12C2.83253 12.795 3.14809 13.5575 3.70989 14.12L11.8799 22.29C11.9736 22.3829 12.048 22.4935 12.0988 22.6154C12.1496 22.7373 12.1757 22.868 12.1757 23C12.1757 23.132 12.1496 23.2627 12.0988 23.3846C12.048 23.5064 11.9736 23.617 11.8799 23.71C11.7865 23.8027 11.6756 23.876 11.5538 23.9257C11.432 23.9755 11.3015 24.0007 11.1699 24Z" fill="#ffffff"/>
        </svg>
    </div>
      <div className="w-full flex justify-center flex-col">
        <canvas
          className="w-[500px] h-[500px] border bg-white mt-20 mx-auto"
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          // onTouchStart={startDrawing}
          // onTouchMove={draw}
          // onTouchEnd={stopDrawing}
          // onTouchCancel={stopDrawing}
        ></canvas>
        <div className="bg-white p-4 rounded-lg mt-10 max-w-lg mx-auto flex justify-between">
          <div className='h-12 w-12 flex flex-col justify-center cursor-pointer' onClick={() => colorRef?.current?.click()}>
            <div className="rounded-full mx-auto border border-gray-400" style={{backgroundColor: color}}>
              <div style={{height: width + 'px', width: width + 'px'}}></div>
              <input
                type={'color'}
                hidden
                ref={colorRef}
                value={color}
                onChange={(e) => setColor(e.target.value)}/>
            </div>
          </div>
          <div className='h-auto border-l-2 mx-4'></div>
          <span className='text-gray-500 my-auto mr-4 min-w-[2.3rem]'>{width} px</span>
          <input
            type="range"
            min={1}
            max={48}
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-auto h-2 bg-gray-200 rounded-lg appearance-none my-auto cursor-pointer "
          />
          <div className='h-auto border-l-2 mx-4'></div>
            <button
                onClick={uploadCanvas}
                className='text-gray-500 px-4 hover:bg-[#20d9c017] hover:text-[#20d9c1] transition-all ease-in-out duration-200'>
                Post it!
            </button>
        </div>
      </div>
    </>
  );
}

export default DrawTemplate;