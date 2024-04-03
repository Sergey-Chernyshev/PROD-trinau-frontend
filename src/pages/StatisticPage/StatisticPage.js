import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CartesianGrid, Legend, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Line } from "recharts";
import sendRequest from "../../api/sendRequest";




export default function StatisticPage() {

    const { idpost, idproject } = useParams();

    const [staticData, setStaticData] = useState([])

    const [dataViews, setDataViews] = useState([])
    const [dataReactions, setDataReactions] = useState([])
    const [dataengagement_rate, setengagement_rate] = useState([])

    const [channelTitle, setChannelTitle] = useState("Загрузка данных...")

    const [postData, setPostData] = useState("Загрузка...")

    useEffect(() => {
    const loginToken = localStorage.getItem("accessToken");
      const header = "Authorization: Bearer " + loginToken;
      sendRequest('GET', `https://trinau-backend.nalinor.dev/api/projects/${idproject}/posts/${idpost}/stats/1/`, null, header)
        .then(response => {
          if (response.code === 0) {
            console.log(response)
            if (response.message.length < 1) {
                toast("Пока нет данных по этому посту", {
                    autoClose: 4000,
                    type: "error",
                    theme: "dark"
                })
                return;
            }
            setChannelTitle(response.message[0].channel.name)
            console.log("r", response.message)
            setStaticData(response.message)
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
      sendRequest('GET', `https://trinau-backend.nalinor.dev/api/projects/${idproject}/posts/${idpost}/`, null, header)
        .then(response => {
          if (response.code === 0) {
            setPostData(response.message)
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

    function formatTime(datetimeString) {
      const datetime = new Date(datetimeString);
      const hours = datetime.getHours();
      const minutes = datetime.getMinutes();
      const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
      return formattedTime;
    }

    useEffect(() => {
      setDataViews(prevDataViews => {
        const formattedData = staticData?.map(data => ({
          time: formatTime(data.created_at),
          views: data.views
        }));
        return [...formattedData];
      });

      setDataReactions(prevDataViews => {
        const formattedData = staticData?.map(data => ({
          time: formatTime(data.created_at),
          reactions: data.reactions
        }));
        return [...formattedData];
      });
      setengagement_rate(prevDataViews => {
        const formattedData = staticData?.map(data => ({
          time: formatTime(data.created_at),
          engagement_rate: data.engagement_rate
        }));
        return [...formattedData];
      });

    }, [staticData]); 
    



    return (
        <>
            <h3>Стастистика для поста: {postData.name} из канала {channelTitle}</h3>
            <div className="d-flex justify-content-center">
            <ResponsiveContainer width="100%" height={500}>
              <p className="text-center">Просмотры</p>
                <LineChart
                    width={500}
                    height={300}
                    data={dataViews}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="views" stroke="#00402f" />
                </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={500}>
            <p className="text-center">Реакции</p>

                <LineChart
                    width={500}
                    height={300}
                    data={dataReactions}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="reactions" stroke="#00402f" />
                </LineChart>
            </ResponsiveContainer>

            
            </div>
            <div style={{marginTop:"90px", paddingBottom:"300px"}}>

            <ResponsiveContainer top="100px" width="100%" height={500}>
            <p className="text-center">Показатель заинтерисованности аудитории (Engagement Rate)</p>

                <LineChart
                    width={500}
                    height={300}
                    data={dataengagement_rate}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="engagement_rate" stroke="#00402f" />
                </LineChart>
            </ResponsiveContainer>
            </div>
        </>



    )
}