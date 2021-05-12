
import React from 'react';
import ShortRecipe from "./ShortRecipe"
import '../styles/RecipeGrid.css';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 900,
      height: 1000,
    },
    gridTile: {
        width: 300,
        height: 500,
      },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));

export default function RecipeGrid({recipeData}) {

    const classes = useStyles();

    return (
        <main>
            <div className="row">
                <div className="col-2 col-sm-2 col-md-1"></div>
                    <div className="col-8 col-sm-8 col-md-10">
                        <div className=" d-flex flex-wrap justify-content-center">
                            {
                            recipeData.map((recipe) =>
                                (<ShortRecipe
                                    key={recipe.dishId} 
                                    recipe={recipe}
                                />))}
                        </div>
                    </div>
                <div className="col-2 col-sm-2 col-md-1"></div>
            </div>
        </main>
    );
}


/*

import React from 'react';
import ShortRecipe from "./ShortRecipe"
import '../styles/SearchResult.css';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 900,
      height: 1000,
    },
    gridTile: {
        width: 300,
        height: 500,
      },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));

export default function RecipeGrid({recipeData}) {

    const classes = useStyles();

    return (
        <main>
            <section className="meals">
            <div className={classes.root}>
                <GridList cellHeight={600} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">Recipes</ListSubheader>
                    </GridListTile>

                        {recipeData.results.map((recipe) => (
                        <GridListTile className={classes.gridTile}>
                            <ShortRecipe key={recipe.id} recipe={recipe} />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            </section>
        </main>
    );
}
*/

/*


import React from 'react';
import ShortRecipe from "./ShortRecipe"
import '../styles/SearchResult.css';

export default function RecipeGrid({recipeData}) {


    return (
        <main>
            <section className="meals">
                <div>
                {recipeData.results.map((recipe) => {
                    return <ShortRecipe key={recipe.id} recipe={recipe} />;
                })}
                </div>
            </section>
        </main>
    );
}

*/