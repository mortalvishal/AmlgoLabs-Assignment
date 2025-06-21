export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export const getInitials = (name)=> {
    if (!name) return "";
    const words = name.split(" ");
    let initials = "";

    for(let i=0;i<Math.min(words.length,2);i++){
        initials += words[i][0];
    }
    return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
    if(num===null|| isNaN(num)) return "";

    const [integerPart, FractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return FractionalPart
    ? `${formattedInteger}.${FractionalPart}`
    : formattedInteger
}

export const prepareExpenseBarChartData = (data =[]) => {
    const chartData = data.map((item)=>({
        category:item?.category,
        amount:item?.amount,
    }))
    return chartData;
}

export const prepareIncomeBarChartData = (data =[]) => {
    const sortedData = [...data].sort((a,b) => new Date(a.date)-new Date(b.date))
    const chartData = sortedData.map((item)=>({
        month: new Date(item?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        amount: item?.amount,
        source: item?.source,
    }))
    return chartData
}
