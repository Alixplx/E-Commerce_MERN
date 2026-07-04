import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


interface ProductProps {

    _id: string
    image: string
    title: string
    price: string
}

export default function ProductCard({ image, title, price}: ProductProps) {
  
    return (

        <Card sx={{ maxWidth: 200 }}>

            <CardMedia
                sx={{ height: 140 }}
                image={image}
                title={title}
            />
            <CardContent>

                <Typography gutterBottom variant="h5" component="div">{title}</Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>${price}</Typography>
            </CardContent>

            <CardActions>

                <Button variant='contained' size="small">Add to Cart</Button>
            </CardActions>
        </Card>
    )
}