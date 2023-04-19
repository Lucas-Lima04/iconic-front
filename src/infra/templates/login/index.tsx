import { AuthService } from "@/infra/api/auth";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginTemplate = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const login = async () => {
    if (email && password) {
      const ret = await AuthService.login(email, password);
      console.log(ret);
      push('home');
      
    }
  };

  return (
    <>
      <div className="flex justify-center flex-col w-full h-[100vh]">
        <div className="bg-white p-9 rounded-xl max-w-xl w-4/5 mx-auto">
          <br />
          <h1 className="text-gray-800 font-bold text-3xl">Welcome!</h1>
          <br />
          <br />
          <label className="text-gray-800">E-mail</label>
          <input
            className="text-gray-800 border w-full rounded-md py-3 px-5"
            placeholder="email@adress.com"
            type={"text"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <label className="text-gray-800">Password</label>
          <input
            className="text-gray-800 border w-full rounded-md py-3 px-5"
            type={"password"}
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <div className="flex w-full justify-between">
            <span
              className="text-gray-400 pointer no-underline my-auto"
              >
              Don&apos;t have an account? <a onClick={() => push('signup')}  className="text-[#20d9c1] font-semibold cursor-pointer">Sign up!</a>
            </span>

            <button
              className="bg-[#20d9c1] ease-in-out transition-all rounded-3xl px-5 py-3 hover:bg-[#18a996]"
              onClick={login}
              >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginTemplate;
