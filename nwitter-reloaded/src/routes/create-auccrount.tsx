import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { Form, Link, useNavigate } from "react-router-dom";
import { Error, Input, Switcher, Title, Wrapper } from "../components/auth-components";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;
    {
      try {
        setIsLoading(true);
        const credentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(credentials.user);
        await updateProfile(credentials.user, { displayName: name });
        navigate("/");
      } catch (e) {
        console.error(e);
        if (e instanceof FirebaseError) {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Wrapper>
      <Title>Join</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="name"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="password"
          type="password"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/login">Login &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
