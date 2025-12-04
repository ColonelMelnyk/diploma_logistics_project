import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/AuthLogic";

export const RegisterForm = () => {
 const dispatch = useDispatch();
    const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

   const [openModal, setOpenModal] = useState(true);
    function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} onSubmit={handleSubmit} autoComplete="off">
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign up into System</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="login">Login</Label>
              </div>
              <TextInput
                type="login"
                name="login"
                placeholder="Login"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Your email</Label>
              </div>
              <TextInput
                type="email"
                name="email"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Your password</Label>
              </div>
              <TextInput 
              name="password" 
              type="password" 
              required />
            </div>
            <div className="w-full">
              <Button>Sign Up</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
export default RegisterForm

//<Button onClick={() => setOpenModal(true)}>Toggle modal</Button>