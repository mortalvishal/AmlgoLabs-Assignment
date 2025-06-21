import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Cell} from 'recharts'
import CustomTooltip from './CustomTooltip'

const getBarColor = (index) => {
  const colors = ['#875CF5', '#FF8042', '#FF6900', '#FFBB28', '#00C49F', '#0088FE'];
  return colors[index % colors.length];
};

const CustomBarChart = ({ data = [] }) => {
  return (
    <div className='bg-white mt-6'>
        <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
            <CartesianGrid stroke='none'/>
            <XAxis dataKey="category" tick={{fontSize:12, fill:"#555"}} stroke='none'/>
            <YAxis tick={{fontSize:12, fill:"#555"}} stroke='none' />
            <Tooltip content={CustomTooltip} />
            <Bar
            dataKey="amount"
            fill ="#FF8042"
            radius={[10,10,0,0]}
            activeDot={{r:8, fill:"yellow"}}
            activeStyle={{fill:"green"}}
            >
                {data.map((entry,index)=>(
                    <Cell key={index} fill={getBarColor(index)}/>
                ))}
            </Bar>
        </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart