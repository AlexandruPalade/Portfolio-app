import axios from "axios";
import { useEffect, useState } from "react";
import PortfolioEntry from "../../Models/PortfolioEntry";
import { apiLink } from "../../Utils/api_links";
import styled from "styled-components";
import hideIcon from "../../assets/hide-button.png";
import showIcon from "../../assets/show-button.png";
import gitHubIcon from "../../assets/github-icon.png";
import createButtonIcon from "../../assets/create-icon.png";
import deleteButtonIcon from "../../assets/delete-icon.png";
import editButtonIcon from "../../assets/edit-icon.png";
import ReusableForm from "../Reusable-Form/ReusableForm";

const initialValues = {
  title: "",
  description: "",
  imageUrl: "",
  customerWebsite: "",
  isHidden: false
};

const Home: React.FC = () => {
  const [portfolios, setPortfolios] = useState<PortfolioEntry[]>([]);
  const [showForm, setShowForm] = useState<Boolean>(false);
  const [portfolio, setPortfolio] = useState<PortfolioEntry>(initialValues);

  const openDialog = () => {
    setShowForm(true);
  };

  const closeDialog = () => {
    setShowForm(false);
  };

  const toggleIsHidden = async (portfolioId: string) => {
    try {
      await axios.put(`${apiLink}toggle/${portfolioId}`);
      fetchData();
    } catch (error) {
      console.error("Error toggling isHidden:", error);
    }
  };

  const deletePortfolio = async (portfolioId: string) => {
    try {
      await axios.delete(`${apiLink}${portfolioId}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (portfolio: PortfolioEntry) => {
    setPortfolio(portfolio);
    openDialog();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(apiLink);
      setPortfolios(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = () => {
    closeDialog();
    fetchData();
  };

  const handleCancel = () => {
    closeDialog();
    setPortfolio(initialValues);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainContainer>
      {showForm ? (
        <ReusableForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialValues={portfolio}
        />
      ) : (
        <>
          <h1>Projects:</h1>
          <PortfoliosList>
            {portfolios.map((portfolio: PortfolioEntry) => (
              <div key={portfolio._id}>
                {!portfolio.isHidden ? (
                  <VisiblePorfolio>
                    <PortfolioImage
                      src={portfolio.imageUrl}
                      alt="Portfolio Image"
                    />
                    <PortfolioInfo>
                      <Description>
                        <Title>{portfolio.title}</Title>
                        <p>{portfolio.description}</p>
                      </Description>
                      <Buttons>
                        <StyledLink href={portfolio.customerWebsite}>
                          <Icon src={gitHubIcon}></Icon>
                        </StyledLink>
                        <Button
                          onClick={() => deletePortfolio(portfolio?._id || "")}
                        >
                          <Icon src={deleteButtonIcon} />
                        </Button>
                        <Button onClick={() => handleEdit(portfolio)}>
                          <Icon src={editButtonIcon} />
                        </Button>
                      </Buttons>
                    </PortfolioInfo>
                    <HideButton
                      onClick={() => toggleIsHidden(portfolio._id || "")}
                    >
                      <ImageButton src={hideIcon} alt="Display" />
                    </HideButton>
                  </VisiblePorfolio>
                ) : (
                  <HiddenPortfolio>
                    <p>{portfolio.title}</p>
                    <ShowButton
                      onClick={() => toggleIsHidden(portfolio._id || "")}
                    >
                      <ImageButton src={showIcon} alt="Display" />
                    </ShowButton>
                  </HiddenPortfolio>
                )}
              </div>
            ))}
          </PortfoliosList>
          <Button onClick={openDialog}>
            <CreateImageButton src={createButtonIcon} alt="Create" />
          </Button>
        </>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const Title = styled.h2`
  text-align: center;
`;

const PortfoliosList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const VisiblePorfolio = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: #05386b;
  height: 25rem;
  width: 40rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
  gap: 1rem;

  @media (max-width: 1480px) {
    flex-direction: column;
    height: auto;
    width: 100%;
  }
`;

const PortfolioImage = styled.img`
  width: 50%;
  height: 100%;
  @media (max-width: 1480px) {
    width: 100%;
    height: auto;
  }
`;

const PortfolioInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 50%;
  @media (max-width: 1480px) {
    width: 100%;
  }
`;

const HideButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  border-radius: 10px;
`;

const ImageButton = styled.img`
  height: 1rem;
`;

const HiddenPortfolio = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: #05386b;
  height: 2rem;
  width: 40rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
  gap: 1rem;
`;

const ShowButton = styled.button`
  background: none;
  border: none;
  border-radius: 10px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  font-weight: bold;
`;

const Icon = styled.img`
  width: 2rem;
  height: 2rem;
`;

const Button = styled.button`
  background-color: inherit;
  border: 0;
`;

const CreateImageButton = styled.img`
  width: 5rem;
  height: 5rem;
`;

const Description = styled.div``;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default Home;
