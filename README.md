# Checkify

This project is a KYC form submission website built using Next.js. It allows users to securely submit their KYC information through a user-friendly interface, with data validated and handled via Next.js API routes.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Form Schema](#form-schema)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Features

- User-friendly KYC form for data submission.
- Secure handling of form data using Next.js API routes.
- Comprehensive validation of user input.
- Responsive design for optimal viewing on various devices.
- Basic error handling and success messages.

## Technologies Used

- **Next.js**: A React framework for building server-rendered applications.
- **Zod**: A TypeScript-first schema declaration and validation library used for input validation.
- **TailwindCSS**: For styling the application.

## Installation

To get started with this project, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/aeswibon/checkify.git
   cd checkify
   ```

2. **Install Dependencies**:
   Make sure you have Node.js & `pnpm` installed, then run:

   ```bash
   pnpm install
   ```

3. **Run the Development Server**:
   Start the application in development mode:

   ```bash
   pnpm dev
   ```

   The app will be available at `http://localhost:3000`.

## Usage

1. Navigate to `http://localhost:3000` in your web browser.
2. Fill out the KYC form with the required information (first name, last name, email, phone, etc.).
3. Click the "Submit" button to send your data.
4. You will see a success message upon successful submission.

## Form Schema

The form submission is validated using Zod with the following schema:

```javascript
import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(2, "Min 2 characters required"),
  lastName: z.string().min(2, "Min 2 characters required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  dateOfBirth: z.string().refine(
    (dob) => {
      const date = new Date(dob);
      const age =
        (new Date().getTime() - date.getTime()) /
        (1000 * 60 * 60 * 24 * 365.25);
      return age >= 18;
    },
    { message: "Must be at least 18 years old" }
  ),
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(2, "Please enter a valid city"),
  state: z.string().min(1, "Please select a state"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  country: z.string().min(1, "Please select a country"),
  idType: z.string().min(1, "Please select an ID type"),
  idNumber: z.string().min(5, "Please enter a valid ID number"),
  idDocument: z.instanceof(File, { message: "Please upload an ID document" }),
  selfie: z.instanceof(File, { message: "Please upload a selfie" }),
  occupation: z.string().min(2, "Please enter your occupation"),
  employerName: z.string().min(2, "Please enter employer name"),
  annualIncome: z.string().regex(/^\d+$/, "Please enter a valid amount"),
  sourceOfFunds: z.string().min(1, "Please select source of funds"),
});
```

### Validation Rules

- **First Name & Last Name**: Minimum of 2 characters required.
- **Email**: Must be a valid email address.
- **Phone**: Minimum of 10 characters required.
- **Date of Birth**: Must be at least 18 years old.
- **Address & City**: Minimum character requirements specified.
- **ZIP Code**: Must match standard US ZIP code format.
- **ID Document & Selfie**: Must upload files.
- **Occupation & Employer Name**: Minimum character requirements specified.
- **Annual Income**: Must be a valid numeric amount.

## API Routes

The application includes an API route to handle form submissions:

### POST /api/submit-kyc

This endpoint accepts POST requests containing KYC data in JSON format.

#### Request Body Example

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "dateOfBirth": "2000-01-01",
  "address": "123 Main St",
  "city": "Anytown",
  "state": "CA",
  "zipCode": "12345",
  "country": "USA",
  "idType": "Passport",
  "idNumber": "A12345678",
  "idDocument": "<file>",
  "selfie": "<file>",
  "occupation": "Software Developer",
  "employerName": "Tech Corp",
  "annualIncome": "80000",
  "sourceOfFunds": "Salary"
}
```

#### Response Example

On successful submission, the response will be:

```json
{
  "success": true,
  "message": "KYC data submitted successfully!"
}
```

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
