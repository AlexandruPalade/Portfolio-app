import React, { useState } from "react";
import axios from "axios";
import { apiLink } from "../../Utils/api_links";
import PortfolioEntry from "../../Models/PortfolioEntry";
import styled from "styled-components";

interface EditFormProps {
  onSubmit: (values: PortfolioEntry) => void;
  onCancel: () => void;
  initialValues: PortfolioEntry;
}

const ReusableForm: React.FC<EditFormProps> = ({
  onSubmit,
  onCancel,
  initialValues
}) => {
  const [values, setValues] = useState<PortfolioEntry>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (initialValues._id) {
        await axios.put(`${apiLink}${initialValues._id}`, values);
      } else {
        await axios.post(apiLink, values);
      }

      onSubmit(values);
    } catch (error) {
      console.error("Error updating portfolio", error);
    }
  };

  return (
    <Main>
      <Form onSubmit={handleSubmit}>
        <Container>
          <InputsContainer>
            <label>Title</label>
            <Input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
          </InputsContainer>
          <InputsContainer>
            <label>Description</label>
            <Input
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
            />
          </InputsContainer>

          <InputsContainer>
            <label>Customer Website</label>
            <Input
              type="text"
              name="customerWebsite"
              value={values.customerWebsite}
              onChange={handleChange}
            />
          </InputsContainer>
          <InputsContainer>
            <label>Image Url</label>
            <Input
              type="text"
              name="imageUrl"
              value={values.imageUrl}
              onChange={handleChange}
            />
          </InputsContainer>
        </Container>
        <ButtonsContainer>
          <Button type="submit">Submit</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ButtonsContainer>
      </Form>
    </Main>
  );
};

const Main = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 20rem;
  height: 2rem;
  border: 0;
  border-radius: 1rem;
  opacity: 0.7;
  font-weight: bold;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  border: 0;
  height: 2rem;
  width: 5rem;
  border-radius: 1rem;
  background-color: #05386b;
  color: white;
  font-weight: bold;
`;

export default ReusableForm;
