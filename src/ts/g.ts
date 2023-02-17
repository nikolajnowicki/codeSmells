/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function calcTotalJumpDistance(jumpDistance: number[]): number {
  let totalJumpDistance = jumpDistance.reduce(
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
  let currentMoment = Date.now();
  let MILLISECONDS_IN_ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
  let sum = 0;
  let count = 0;

  for (let temp of temperatures) {
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
  let { name, price, description, image } = productInformation;

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

  let productPrice = document.createElement("strong");
  productPrice.textContent = `Price: ${price} Kr`;
  container.appendChild(productPrice);

  return container;
}

function showProducts(productData: ProductData, parent: HTMLElement) {
  let productElement = createProductElement(productData);
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

function createStudentCheckbox(passed: boolean): HTMLDivElement {
  let container = document.createElement("div");
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = passed;
  container.appendChild(checkbox);
  return container;
}

function presentStudents(
  students: Student[]
): [HTMLDivElement[], HTMLDivElement[]] {
  let passedStudents: HTMLDivElement[] = [];
  let failedStudents: HTMLDivElement[] = [];

  for (let student of students) {
    const studentCheckbox = createStudentCheckbox(student.passed);

    if (student.handedInOnTime) {
      passedStudents.push(studentCheckbox);
    } else {
      failedStudents.push(studentCheckbox);
    }
  }

  let studentsThatPassed = document.querySelector("ul#passedstudents");
  let studentsThatFailed = document.querySelector("ul#failedstudents");

  studentsThatPassed?.append(...passedStudents);
  studentsThatFailed?.append(...failedStudents);

  return [passedStudents, failedStudents];
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */

function concatenateStrings() {
  let result = ["Lorem", "ipsum", "dolor", "sit", "amet"];
  return result.join("");
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/

class UserInformation {
  constructor(
    public name: string,
    public birthday: Date,
    public email: string,
    public password: string
  ) {}
}

function validateAge(birthday: Date): number {
  const ageDiff = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function getAge(data: UserInformation): number {
  const userAge = validateAge(data.birthday);

  if (userAge < 20) {
    throw new Error("Du är under 20 år");
  }

  return userAge;
}
