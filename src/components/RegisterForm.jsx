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
          <form>
            <h3>Реєстрація в системі</h3>
            <div>
              <div>
                <Label htmlFor="login">Логін</Label>
              </div>
              <TextInput
                type="login"
                name="login"
                autoComplete="login"
                required
              />
            </div>
            <div>
              <div>
                <Label htmlFor="email">Пошта</Label>
              </div>
              <TextInput
                type="email"
                name="email"
                placeholder="name@company.com"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <div>
                <Label htmlFor="password">Пароль</Label>
              </div>
              <TextInput 
              name="password" 
              type="password"
              autoComplete="new-password" 
              required />
            </div>
            <div>
              <Button>Реєстрація</Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
export default RegisterForm

