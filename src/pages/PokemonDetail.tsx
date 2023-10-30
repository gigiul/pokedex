import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { pokemonActions, pokemonSelectors } from '../pokemon/index'
import { Spin, Card } from 'antd';

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    LinearScale
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

interface LineProps {
    options: ChartOptions<'line'>;
    data: ChartData<'line'>;
}


ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    LinearScale
);


interface Props {
    item: {
        name: string;
        sprites: {
            front_default: string;
            back_default: string;
        };
        weight: string;
        height: string;
        abilities: [];
        moves: [];
        types: ITypes[];
        id: number;
        description: string;
        stats: [];
        weaknesses: [];
    };
}


interface IAbilities {
    ability: {
        name: string
    }
}

interface IMoves {
    name: string;
    accuracy: string;
}

interface ITypes {
    type: {
        name: string;
    }
}

const PokemonDetail: React.FC<Props> = ({ item }) => {
    const isLoadingPokemonDetail = useSelector(pokemonSelectors.getIsLoadingPokemonDetail)
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(pokemonActions.fetchPokemonDetail(id));
    }, [id])

    function getData() {
        let data: any = [];
        item.stats?.map((i: any) => {
            data.push(i.base_stat)
        })

        return data
    }


    const data = {
        labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
        datasets: [
            {
                label: 'Stats',
                data: getData(),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgb(246, 177, 98)',
                pointLabelFontSize: 16
            },
        ],
    };

    const options = {
        fill: true,
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    maxTicksLimit: 8,
                    backdropPadding: 2,
                },
                grid: {
                    color: 'rgba(246, 177, 98, 0.2)',
                    lineWidth: 2,
                },
                angleLines: {
                    color: 'rgba(246, 177, 98, 0.2)',
                    lineWidth: 2,
                },
                pointLabels: {
                    padding: 12,
                },
                maintainAspectRatio: false,

            },



        },
        plugins: {
            legend: {
                display: false,
            },
        },

    };

    const getBackgroundColorByType = (type: string) => {
        switch (type) {
            case 'water':
                return '#4A90E2';
            case 'grass':
                return '#56B676';
            case 'electric':
                return '#FCC42D';
            case 'fire':
                return '#BA4A4A';
            default:
                return '#A0A0A0';
        }
    };

    return (
        <div>
            {
                !isLoadingPokemonDetail ? (
                    <>
                        <Link className='backArrow' to={'/'}>&#8592;</Link>
                        <div className='detail'>
                            <h1>{item.name} #{item.id}</h1>
                            <div className='detail__images'>
                                <img className='detail__images__wh' src={item.sprites.front_default} alt='front' />
                                <img className='detail__images__wh' src={item.sprites.back_default} alt='back' />
                            </div>
                            <p className='detail__description'>{item.description}</p>

                            <div className='detail__infos'>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div className='detail__infos__type'>
                                        <h3 className='detail__infos__type__title'>Type</h3>
                                        <div className='detail__infos__type__desc'>
                                            <p className='detail__infos__type__desc__color' style={{ backgroundColor: getBackgroundColorByType(item.types[0]?.type?.name) }}>{item.types[0]?.type?.name}</p>
                                        </div>
                                    </div>
                                    <div className="detail__infos__weaknesses">
                                        <h3 className="detail__infos__weaknesses__title">Weaknesses</h3>
                                        <div className="detail__infos__weaknesses__desc">
                                            {
                                                item.weaknesses.map((i: any, k: number): any => {
                                                    return (
                                                        <p className='detail__infos__weaknesses__desc__color' key={k} style={{ backgroundColor: getBackgroundColorByType(i.name) }}>{i.name}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="detail__infos__moves">
                                        <h3 className="detail__infos__moves__title">
                                            Moves
                                        </h3>
                                        {
                                            item.moves.map((i: { name: string }, k: number) => {
                                                return (
                                                    <p key={k} className="detail__infos__moves__move">
                                                        {i.name}
                                                    </p>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="detail__infos__bmi">
                                        <h3 className='detail__infos__bmi__title'>BMI</h3>
                                        <p className='detail__infos__bmi__desc'>{Number(item.weight) / 10} kgs</p>
                                        <p className='detail__infos__bmi__desc'>{Number(item.height) / 10} meters</p>
                                    </div>
                                </div>

                                <div className='detail__infos__chart'>
                                    <Radar data={data} options={options} />
                                </div>
                            </div>


                        </div>
                    </>
                ) : (<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p>Loading. . .</p>
                    <Spin />
                </div>)
            }
        </div>
    )
}

export default PokemonDetail