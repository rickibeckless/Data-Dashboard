import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, ResponsiveContainer, Cell, Sector } from 'recharts';

const DataChartCard = ({ searchResults, mediaType, cast }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [castImageURL, setCastImageURL] = useState("");
    const [dataWithGenres, setDataWithGenres] = useState([]);

    const castName = cast[0].name;

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        const fetchCastImageURL = async () => {
            if (cast.length > 0) {
                const castId = cast[0].id;
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/person/${castId}/images`, {
                        params: {
                            api_key: import.meta.env.VITE_MOVIE_SEARCH_KEY
                        }
                    });
                    const profiles = response.data.profiles;
                    if (profiles.length > 0) {
                        const filePath = profiles[0].file_path;
                        setCastImageURL(`https://image.tmdb.org/t/p/w500/${filePath}`);
                    }
                } catch (error) {
                    console.error('Error fetching cast image:', error);
                }
            }
        };
        fetchCastImageURL();
        
        const fetchGenres = async () => {
            if (searchResults.length > 0) {
                const movieId = searchResults[0].id;
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                        params: {
                            api_key: import.meta.env.VITE_MOVIE_SEARCH_KEY
                        }
                    });
                    const genres = response.data.genres.map(genre => genre.id);

                    const creditsResponse = await axios.get(`https://api.themoviedb.org/3/person/${cast[0].id}/combined_credits`, {
                        params: {
                            api_key: import.meta.env.VITE_MOVIE_SEARCH_KEY
                        }
                    });

                    const credits = creditsResponse.data.cast.filter(item => item.media_type === 'movie');
                    const genreCount = {};
                    const totalCredits = credits.length;
                    credits.forEach(credit => {
                        credit.genre_ids.forEach(genreId => {
                            if (genreId in genreCount) {
                                genreCount[genreId]++;
                            } else {
                                genreCount[genreId] = 1;
                            }
                        });
                    });

                    const newData = genres.map(genreId => ({
                        genre: genreId,
                        name: response.data.genres.find(g => g.id === genreId)?.name,
                        value: (genreCount[genreId] / totalCredits) * 100
                    }));

                    const otherGenresCount = totalCredits - genres.reduce((acc, genreId) => acc + genreCount[genreId], 0);
                    newData.push({
                        genre: 'Other',
                        name: 'Other',
                        value: (otherGenresCount / totalCredits) * 100
                    });

                    setDataWithGenres(newData);
                } catch (error) {
                    console.error('Error fetching genres:', error);
                }
            }
        };
        fetchGenres();
    }, [cast, searchResults]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${name} (${value.toFixed(2)}%)`}
            </text>
        );
    };
    

    return (
        <div id="chart-card">
            <ResponsiveContainer>
                <PieChart width="100%" height="100%">
                    <Pie style={{outline: 'none'}}
                        data={dataWithGenres}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        fill="#8884d8"
                        dataKey="value"
                        activeIndex={activeIndex}
                        activeShape={(props) => {
                            const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, percent, name, value } = props;
                            return (
                                <g>
                                    <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                                        {dataWithGenres[activeIndex]?.name}
                                    </text>
                                    <Sector
                                        cx={cx}
                                        cy={cy}
                                        innerRadius={innerRadius}
                                        outerRadius={outerRadius}
                                        startAngle={startAngle}
                                        endAngle={endAngle}
                                        fill={fill}
                                    />
                                </g>
                            );
                        }}
                        onMouseEnter={onPieEnter}
                        onMouseLeave={() => setActiveIndex(null)}
                    >
                        {dataWithGenres.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={activeIndex === index ? COLORS[index % COLORS.length] : '#ccc'} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div id="chart-right-holder">
                <div id="chart-legend"></div>
                <div id="chart-cast">
                    <h3>{castName}</h3>
                    {castImageURL ? (
                        <div id="cast-img-holder">
                            <img id="cast-img" src={castImageURL} alt="" />
                        </div>
                    ) : (
                        <h4>Nothing Here Yet!</h4>
                    )}
                </div>
            </div>
        </div>
    );
};
  
export default DataChartCard;
