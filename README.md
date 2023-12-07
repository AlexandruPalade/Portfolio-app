# Portfolio App - fullstack web application that manage the list of projects for a digital worker.

## 1. Frontend - for the fronted I used React 

Home component within the Portfolio Management system is responsible for displaying, editing, and managing portfolios. It interacts with the backend API to perform CRUD operations and render portfolio data in a user-friendly manner.

### Functionality: 
- Manages the main logic for displaying portfolios, handling CRUD operations, and controlling the dialog forms.

### Imports: 
- Utilizes Axios for API requests, React's useState and useEffect hooks for state management, and various assets for icons and styling.

### Styled Components
- Includes styled components that define the visual layout and styling for the portfolios and related elements.

### Usage

- Initial Load: Fetches portfolio data when the component mounts using useEffect.

- Dialog Forms: Toggles between showing portfolio data and dialog forms for creation/editing.

- CRUD Operations: Performs operations like adding, editing, and deleting portfolios using API requests through Axios.

## Dependencies
- React: Manages the component-based UI structure.
- Axios: Handles asynchronous API requests.
- Styled Components: Offers styled-component support for enhanced CSS styling within JavaScript.
- Reusable-Form Component: Presumably used for creating and editing portfolios in dialog forms.

##Important Notes
- The component heavily relies on the backend API defined by the apiLink for CRUD operations and data handling.
- Styling, including layout and appearance, is managed through styled components.
- Error handling for API requests (try-catch) is in place to handle potential failures when fetching or modifying data.
  
##Usage Instructions
- Ensure proper installation of dependencies (npm install or yarn install).
- Configure the apiLink to point to the appropriate backend API.
- Utilize this component in the relevant part of the application to manage portfolios effectively.

## 2. Backend - for the backend I used NestJs, to handle CRUD operations and interactions with portfolio data.

## POST /portfolios
- Functionality: Creates a new portfolio entry.
- Request: Expects a JSON body containing details of the portfolio entry (title, description, imageUrl, customerWebsite).
- Response: Returns the newly created portfolio entry or an error message in case of failure.
  
## GET /portfolios
- Functionality: Retrieves all portfolios.
- Response: Returns an array of portfolio entries or an error message if no portfolios are found.
  
## GET /portfolios/:id
- Functionality: Retrieves a portfolio by its ID.
- Request: Expects the ID of the portfolio in the URL parameter.
- Response: Returns the portfolio entry associated with the given ID or an error if not found.
  
##PUT /portfolios/:id
- Functionality: Updates a portfolio by its ID.
- Request: Expects the ID of the portfolio in the URL parameter and updated portfolio details in the request body.
- Response: Returns the updated portfolio entry or an error if the update fails.
  
##DELETE /portfolios/:id
- Functionality: Deletes a portfolio by its ID.
- Request: Expects the ID of the portfolio in the URL parameter.
- Response: Returns the deleted portfolio entry or an error if the deletion fails.
  
##PUT /portfolios/toggle/:id
- Functionality: Toggles the visibility of a portfolio by its ID.
- Request: Expects the ID of the portfolio in the URL parameter.
- Response: Returns the toggled portfolio entry or an error if the operation fails.
  
##Important Notes
- The controller handles various HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on portfolios.
- Error handling is implemented for scenarios like duplicate entries, missing portfolios, and server errors.
- The controller interacts with the PortfolioMangementService to perform business logic related to portfolios.
  
##Dependencies
- @nestjs/common: NestJS framework for building scalable applications.
- express: A robust web framework for Node.js powering the REST API.
- express.Response: Provides methods to manage HTTP response data.
  
##Usage Instructions
- Ensure proper installation of dependencies (npm install or yarn install).
- Configure the routes and corresponding service methods within the PortfolioMangementService.
- Utilize this controller to handle portfolio-related HTTP requests in the application.



