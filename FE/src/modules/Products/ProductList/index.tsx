import React from 'react';
import { observer } from 'mobx-react-lite';
import {
    Box,
    Pagination,
    PaginationItem,
    Typography,
    styled,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { t } from 'i18next';
import axios from 'axios';

import { useProductStore } from '../store';
import Footer from '../../../components/Footer';
import Navbar from '../../../components/Navbar';
import { Product } from '../../../types';

import Sidebar from './Sidebar';
import ProductItem from './ProductItem';

const ProductList: React.FunctionComponent = observer(() => {
    const PRODUCTS_PER_PAGE = 25;

    const { store } = useProductStore();

    const [productsPerPage, setProductsPerPage] = React.useState<Product[]>(store.allProducts);
    const [open, setOpen] = React.useState<boolean>(false);
    const [nameForm, setNameForm] = React.useState<string>('');
    const [brandForm, setBrandForm] = React.useState<string>('');
    const [categoryForm, setCategoryForm] = React.useState<string>('');
    const [descriptionForm, setDescriptionForm] = React.useState<string>('');
    const [giaTienForm, setGiaTienForm] = React.useState<string>('');
    const [kichThuocHatForm, setKichThuocHatForm] = React.useState<string>('');
    const [noiSanXuatForm, setNoiSanXuatForm] = React.useState<string>('');
    const [soLuongForm, setSoLuongForm] = React.useState<string>('');
    const [trongLuongBaoForm, setTrongLuongBaoForm] = React.useState<string>('');

    const [page, setPage] = React.useState<number>(1);
    const handleProductPerPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setNewProductsPerPage(page);
        setPage(page);
    };
    const role = localStorage.getItem('Role');

    const setNewProductsPerPage = (page: number) => {
        const products = store.products;
        const newProductsPerPage = products.slice(PRODUCTS_PER_PAGE * (page - 1), PRODUCTS_PER_PAGE * page);
        setProductsPerPage(newProductsPerPage);
    };

    React.useEffect(() => {
        store.getCategories();
        store.getBrands();
        store.getAvailableProducts();
    }, []);

    React.useEffect(() => {
        setPage(1);
    }, [store.allProducts, store.products]);

    React.useEffect(() => {
        setNewProductsPerPage(page);
    }, [store.products, page]);
    console.log('productsPerPage', productsPerPage);

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        axios
            .post('http://localhost:4000/addProduct', {
                Name: nameForm,
                BrandId: brandForm,
                CategoryId: categoryForm,
                GiaTien: giaTienForm,
                KichThuocHat: kichThuocHatForm,
                NoiSanXuat: noiSanXuatForm,
                SoLuong: soLuongForm,
                TrongLuongBao: trongLuongBaoForm,
            })
            .then(function (response: any) {
                console.log(response);
            });
        setOpen(false);
        window.location.reload();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameForm(event.target.value);
    };

    const onChangeBrand = (event: SelectChangeEvent) => {
        setBrandForm(event.target.value);
    };

    const onChangeCategory = (event: SelectChangeEvent) => {
        setCategoryForm(event.target.value);
    };

    const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescriptionForm(event.target.value);
    };

    const onChangeGiaTien = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGiaTienForm(event.target.value);
    };

    const onChangeKichThuocHat = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKichThuocHatForm(event.target.value);
    };

    const onChangeNoiSanXuat = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNoiSanXuatForm(event.target.value);
    };

    const onChangeSoLuong = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSoLuongForm(event.target.value);
    };

    const onChangeTrongLuongBao = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrongLuongBaoForm(event.target.value);
    };

    return (
        <Box>
            <Navbar />

            <Box display="flex" flex-direction="row">
                <Sidebar />

                <Box
                    margin-left="2%"
                    width="70%"
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    columnGap="1rem"
                >
                    {role != 'user' && (
                        <Button variant="contained" color="success" onClick={handleClickOpen}>
                            Thêm sản phẩm{' '}
                        </Button>
                    )}

                    <Box
                        width="100%"
                        minHeight="40rem"
                        paddingTop="1rem"
                        marginLeft="5%"
                        columnGap="3%"
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        alignSelf="center"
                        flexWrap="wrap"
                    >
                        {productsPerPage.map((item) => (
                            <ProductItem productItem={item} key={item._id} />
                        ))}
                    </Box>
                    <Box
                        width="50%"
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        alignSelf="flex-start"
                        marginLeft="15%"
                        paddingBottom="1%"
                    >
                        <Typography> {store.products.length + ` ${t('product.result')} `} </Typography>
                        <StyledPagination
                            count={Math.ceil(store.products.length / 25)}
                            page={page}
                            variant="outlined"
                            shape="rounded"
                            renderItem={(item) => (
                                <PaginationItem
                                    components={{
                                        previous: ArrowBackIcon,
                                        next: ArrowForwardIcon,
                                    }}
                                    {...item}
                                />
                            )}
                            onChange={handleProductPerPageChange}
                        />
                    </Box>
                </Box>
            </Box>
            <Footer />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thêm sản phẩm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Vui lòng nhập đủ thông tin sản phẩm bạn muốn thêm. Sau đó nhấn Xác nhận để hoàn tất quá trình
                        tạo sản phẩm.
                    </DialogContentText>
                </DialogContent>
                <DialogContent>
                    <TextField
                        onChange={onChangeName}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                        variant="standard"
                    />
                    <br></br>
                    <br></br>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={brandForm}
                        fullWidth
                        variant="filled"
                        label="Brand"
                        onChange={onChangeBrand}
                    >
                        <MenuItem value={1}>Heo</MenuItem>
                        <MenuItem value={2}>Gà</MenuItem>
                        <MenuItem value={3}>Vịt</MenuItem>
                    </Select>
                    <br></br>
                    <br></br>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={categoryForm}
                        variant="filled"
                        fullWidth
                        label="Category"
                        onChange={onChangeCategory}
                    >
                        <MenuItem value={1}>De Hues</MenuItem>
                        <MenuItem value={2}>Mekong</MenuItem>
                        <MenuItem value={3}>Comfeed</MenuItem>
                    </Select>
                    <br></br>
                    <br></br>
                    <TextField
                        onChange={onChangeDescription}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Description"
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        onChange={onChangeGiaTien}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Giá Tiền"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={onChangeKichThuocHat}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Kích thước"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={onChangeNoiSanXuat}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nơi Sản Xuất"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={onChangeSoLuong}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Số Lượng"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={onChangeTrongLuongBao}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Trọng Lượng Bao"
                        fullWidth
                        variant="standard"
                    />
                    <Button variant="contained" component="label">
                        Thêm hình
                        <input type="file" hidden />
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Đóng</Button>
                    <Button onClick={handleAdd}>Thêm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
});

export default ProductList;

const StyledPagination = styled(Pagination)`
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-self: center;
`;
