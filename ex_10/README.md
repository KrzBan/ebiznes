Aplikacja dostępna pod:
https://pofrontend2023.azurewebsites.net/

docker build --tag 'cloud_back' .
docker run -p 5000:5000 'cloud_back'

docker build --tag 'cloud_front' .
docker run -p 5173:5173 'cloud_front'