import { useParams } from "react-router";
import { Link } from "react-router-dom";
import LoginForm from "../components/ui/LoginForm";
import RegisterForm from "../components/ui/RegisterForm";

const Login = () => {
  const { type } = useParams<{ type?: string }>();

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {type === "register" ? (
            <>
              <h3 className="mb-3">Регистрация</h3>
              <RegisterForm />
              <div className="text-center">
                <p>
                  Уже есть аккаунт? <Link to="/login">Войти</Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <h3 className="mb-3">Авторизация</h3>
              <LoginForm />
              <div className="text-center">
                <p>
                  Нет аккаунта? <Link to="/login/register">Зарегистрироваться</Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
