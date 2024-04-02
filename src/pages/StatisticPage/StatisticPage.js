import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CartesianGrid, Legend, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Line } from "recharts";
import sendRequest from "../../api/sendRequest";


const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default function StatisticPage() {

    const { idpost, idproject } = useParams();

    console.log(idpost, idproject)

    useEffect(() => {
    const loginToken = localStorage.getItem("accessToken");
      const header = "Authorization: Bearer " + loginToken;
      sendRequest('GET', `https://trinau-backend.nalinor.dev/api/projects/${idproject}/posts/${idpost}/stats/1/`, null, header)
        .then(response => {
          if (response.code === 0) {
            console.log("r", response)
            toast("Получение статистики", {
              autoClose: 500,
              type: "action",
              theme: "dark",
            });
          }
          else {
            toast(response.message.message, {
              autoClose: 4000,
              type: "error",
              theme: "dark"
            })
          }
        })
        .catch(error => {
          console.error(error);
          toast("Произошла ошибка при получении данных", {
            autoClose: 2500,
            type: "error",
            theme: "dark"
          });
        });
    }, []);




    return (
        <>
            <div>Стастистика для поста с id: {idpost}</div>
            <ResponsiveContainer width={500} height={500}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </>



    )
}