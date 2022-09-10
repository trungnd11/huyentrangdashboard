import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Input from "../../../components/input/Input";
import logo from "../../../statics/logo/logo.png";
import { loginUser } from "../../../stores/login/login";
export default function Login() {
  const dispatch = useDispatch<any>();
  const formValidation = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Tên đăng nhập không được để trống"),
      password: Yup.string().required("Mật khẩu không được để trống").min(6, "Mật khẩu ít nhất 6 kí tự")
    }),
    onSubmit: (value) => {
       dispatch(loginUser(value));
    }
  })

  return (
    <div className="login-page">
      <div className="logo text-center">
        <img src={logo} alt="" />
      </div>
      <h3 className="text-center mb-4">Huyen Trang Tran Beauty Center Admin</h3>
      <h3 className="text-center">Đăng nhập</h3>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          formValidation.handleSubmit();
          return false;
        }}
      >
        <div className="row mt-3">
          <div className="col-12">
            <label htmlFor="">Tên đăng nhập</label>
            <Input
              type="text"
              name="username"
              className="form-control mt-1"
              placeholder="Nhập tên đăng nhập..."
              value={formValidation.values.username}
              onChange={formValidation.handleChange}
              isValid={
                formValidation.errors.username &&
                formValidation.touched.username
                  ? true
                  : false
              }
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <label htmlFor="">Mật khẩu</label>
            <Input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Nhập mật khẩu..."
              value={formValidation.values.password}
              onChange={formValidation.handleChange}
              isValid={
                formValidation.errors.password &&
                formValidation.touched.password
                  ? true
                  : false
              }
            />
          </div>
        </div>
        <div className="row my-4">
          <div className="col-12 text-center">
            <button type="submit" className="btn-login">
              <span>Đăng nhập ngay</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
