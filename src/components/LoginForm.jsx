import { logIn } from "../redux/AuthLogic";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";


export const LoginForm = () =>{
const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      logIn({
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
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Your email</Label>
              </div>
              <TextInput
                type= "email"
                name= "email"
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
              <Button>Log in </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      </>
  );
}
export default LoginForm

// <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>