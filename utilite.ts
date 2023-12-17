export  const convertDateToString = (date:Date)=>
date.toISOString()
            .substring(10)
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
            

export const keep2Dec = (num:number) =>
    Math.round(num * 100)/100;
