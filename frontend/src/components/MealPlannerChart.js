import React from 'react'
import Chart from "react-google-charts"

export default function MealPlannerChart(props) {
    return (
        <div>
            {/* <Chart
                width={'100%'}
                height={'80vh'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Task', 'Hours per Day'],
                    ['Protein', 5],
                    ['Carbohydrates', 2],
                    ['Fats', 2],
                    ['Fiber', 7],
                ]}
                options={{
                    title: 'Total Nutrition of This Week (g)',
                    // colors:['#e8d2ae', '#d7b29d', '#cb8589', '#796465', '#dde8b9']
                    // colors:['352208','e1bb80','7b6b43','685634','806443']
                    // colors:['cc8b86','f9eae1','7d4f50','d1be9c','aa998f']
                    // colors:['B24674','FF5274','FF8D74','FFDF99']
                }}
                rootProps={{ 'data-testid': '1' }}
            /> */}
            <Chart
                width={'100%'}
                height={'80vh'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                    [
                        'Nutrition',
                        'Percentage (%)',
                        { role: 'style' },
                        {
                            sourceColumn: 0,
                            role: 'annotation',
                            type: 'string',
                            calc: 'stringify',
                        },
                    ],
                    ['Carbohydrates', props.nutrition.carbohydrates/(260*7)*100, '#B24674', null],
                    ['Protein', props.nutrition.protein/(50*7)*100, 'FF5274', null],
                    ['Fat', props.nutrition.fat/(70*7)*100, 'FF8D74', null],
                    ['Calories', props.nutrition.calories/(2000*7)*100, 'color: #FFDF99', null],
                ]}
                options={{
                    title: 'Percentage of Weekly Nutritional Requirement (Compared to nutrition requirement of adult)',
                    bar: { groupWidth: '95%' },
                    legend: { position: 'none' },
                }}
            />
        </div>
    )
}
