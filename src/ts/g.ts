/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function calcTotalJumpDistance(jumpDistance: number[]): number {
  const totalJumpDistance = jumpDistance.reduce(
    (jumpDistanceSoFar, currentJumpDistance) =>
      jumpDistanceSoFar + currentJumpDistance,
    0
  );
  return totalJumpDistance;
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

function getStudentGrade(student: Student): string {
  let passed = false;
  if (student.name === "Nikolaj") {
    passed = student.handedInOnTime;
  }

  if (passed) {
    return "VG";
  } else {
    return "IG";
  }
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

class Temperature {
  constructor(
    public location: string,
    public date: Date,
    public temperature: number
  ) {}
}

function averageWeeklyTemperature(temperatures: Temperature[]): number {
  const currentMoment = Date.now();
  const MILLISECONDS_IN_ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
  let sum = 0;
  let count = 0;

  for (const temp of temperatures) {
    if (
      temp.location === "Helsingborg" &&
      temp.date.getTime() > currentMoment - MILLISECONDS_IN_ONE_WEEK
    ) {
      sum += temp.temperature;
      count++;
    }
  }

  return count > 0 ? sum / count : 0;
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

class ProductData {
  constructor(
    public name: string,
    public price: number,
    public description: string,
    public image: string,
    public parent: HTMLElement
  ) {}
}

function createProductElement(productInformation: ProductData): HTMLElement {
  const { name, price, description, image } = productInformation;

  let container = document.createElement("div");
  container.classList.add("product");

  let title = document.createElement("h4");
  title.textContent = name;
  container.appendChild(title);

  let imageTag = document.createElement("img");
  imageTag.src = image;
  container.appendChild(imageTag);

  let productDescription = document.createElement("p");
  productDescription.textContent = description;

  const productPrice = document.createElement("strong");
  productPrice.textContent = `Price: ${price} Kr`;
  container.appendChild(productPrice);

  return container;
}

function showProducts(productData: ProductData, parent: HTMLElement) {
  const productElement = createProductElement(productData);
  if (!productElement) {
    console.error("Error showing product: product is null or undefined");
    return;
  }
  parent.appendChild(productElement);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */
function presentStudents(students: Student[]) {
  for (const student of students) {
    if (student.handedInOnTime) {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = true;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#passedstudents");
      listOfStudents?.appendChild(container);
    } else {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = false;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#failedstudents");
      listOfStudents?.appendChild(container);
    }
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */
function concatenateStrings() {
  let result = "";
  result += "Lorem";
  result += "ipsum";
  result += "dolor";
  result += "sit";
  result += "amet";

  return result;
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/
function createUser(
  name: string,
  birthday: Date,
  email: string,
  password: string
) {
  // Validation

  let ageDiff = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  console.log(userAge);

  if (!(userAge < 20)) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}
