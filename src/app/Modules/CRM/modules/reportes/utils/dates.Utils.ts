import { Venta } from "src/app/Modules/shared/models/Data/Venta.model";


export const  getMonthsBetweenDates = (startDate  = getFirstDayOfYear(), endDate  = new Date()) : string[] =>{
  const monthNames: string[] = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const monthsBetween: string[] = [];

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const currentMonthName = monthNames[currentDate.getMonth()];
    monthsBetween.push(currentMonthName);

    // Move to the next month
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return monthsBetween;
}


function getFirstDayOfYear(): Date {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const firstDayOfYear = new Date(currentYear, 0, 1);
  return firstDayOfYear;
}


export const setMensualDetails = ( ventas : Venta[], month : string) =>{

  const validMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  if (!validMonths.includes(month)) {
    console.error("Invalid month string.");
    return null;
  }


  // Get the current date
  const currentDate = new Date();


  // Extract the current month and year
  const currentYear = currentDate.getFullYear();

  const newDate = new Date(`${month} , ${currentYear}`);

  ventas = ventas.filter( venta => {

    const ventaFecha = addOneDayToDate(new Date(venta.fecha_venta));
    const monthSale = ventaFecha.getMonth();
    const yearSale = ventaFecha.getFullYear();


    if( (monthSale === newDate.getMonth()) && (currentYear=== yearSale)){
      return true;
    }
    else{
      return false
    }
  })

  return ventas;


}

export const addOneDayToDate = (date: Date): Date  =>{
  const oneDayMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
  const newDateMilliseconds = date.getTime() + oneDayMilliseconds;
  const newDate = new Date(newDateMilliseconds);
  return newDate;
}

export const addDaysToDate = (date: Date, daysToAdd: number): Date => {
  const oneDayMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
  const newDateMilliseconds = date.getTime() + (daysToAdd * oneDayMilliseconds);
  const newDate = new Date(newDateMilliseconds);
  return newDate;
};


export const getColorByMensualDetail = ( month : string) => {

  const monthsColor = [
    {
      month :"January",
      color : 'rgb(255, 99, 132)',
    },
    {
      month :"February",
      color : 'rgb(235, 64, 52)',
    },
    {
      month :"March",
      color : 'rgb(209, 93, 25)',
    },
    {
      month :"April",
      color : 'rgb(25, 209, 194)',
    },
    {
      month :"May",
      color : 'rgb(25, 43, 209)',
    },
    {
      month :"June",
      color : 'rgb(209, 25, 188)',
    },
    {
      month :"July",
      color : 'rgb(209, 25, 37)',
    },
    {
      month :"August",
      color : 'rgb(54, 204, 35)',
    },
    {
      month :"September",
      // 242, 220, 238
      color : 'rgb(242, 220, 238)',
    },
    {
      month :"October",
      // 85, 112, 110
      color : 'rgb(85, 112, 110)',
    },
    {
      month :"November",
      // 49, 66, 92
      color : 'rgb(49, 66, 92)',
    },
    {
      month :"December",
      // 13, 26, 46
      color : 'rgb(13, 26, 46)',
    },



  ]

  const validMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  if (!validMonths.includes(month)) {
    console.error("Invalid month string.");
    return null;
  }

  return null;
}

export const getDaysInMonth = (month: number, year: number): number => {
  // The month in JavaScript's Date object is 0-based (0 for January, 1 for February, etc.)
  // So, we subtract 1 from the provided month to get the correct value for the Date constructor.
  const date = new Date(year, month - 1, 1);

  // Move to the next month and get the 0th day (which will be the last day of the current month).
  date.setMonth(date.getMonth() + 1, 0);

  // The getDate() method now returns the number of days in the month.
  return date.getDate();
}
export const getNumMonth = (month : string) :number | null => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];



  const monthIndex = months.indexOf(month);

  if (monthIndex !== -1) {
    return monthIndex + 1; // Sumamos 1 porque los índices del array comienzan en 0
  } else {
    return null; // Retornamos null si no se encuentra el mes
  }

}

export const convertToYYYYMM  = (monthNumber: number): string | null=> {

  const numericMonth = monthNumber;

  if (isNaN(numericMonth) || numericMonth < 1 || numericMonth > 12) {
    return null; // Return null if the input is not a valid month number (1 to 12)
  }

  const year = new Date().getFullYear();
  const month = numericMonth.toString().padStart(2, '0');

  return `${year}-${month}`;
}

