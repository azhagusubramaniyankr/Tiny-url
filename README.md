Frontend (Angular)  


    1. Open a new terminal and navigate to Angular frontend folder:  
            cd frontend-angular  

    2. Install frontend dependencies:  
            npm install  
            npm install -g @angular/cli  

    3. Check API URL in src/app/services/url.ts:  
            private apiUrl = 'http://localhost:5000/api/urls';  

    4. Run the Angular app:  
            ng serve  

    5. Open in browser:  
            http://localhost:4200  


Backend (ASP.NET Core)  


    1. Open terminal and navigate to backend folder:  
            cd backend-ASP.NET  

    2. Install dependencies:  
            dotnet add package Microsoft.EntityFrameworkCore.Sqlite  
            dotnet add package Microsoft.EntityFrameworkCore.Tools  
            dotnet add package Swashbuckle.AspNetCore 

    3. Run the backend API:  
            dotnet run  

    4. The backend API will be available at:  
            http://localhost:5000  
            https://localhost:5001 

    5. Swagger UI for testing:  
            http://localhost:5000/swagger  
