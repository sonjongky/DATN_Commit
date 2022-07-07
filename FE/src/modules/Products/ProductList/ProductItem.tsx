import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Button as MuiButton,
    Typography,
    styled,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select,
    TextField,
    SelectChangeEvent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Product, ProductCode } from '../../../types';
import Image from '../../../components/Image';
import Button from '../../../components/Button';
import { TextTransform } from '../../../styles/types';
import { useProductStore } from '../store';
import { theme } from '../../../styles/theme';
import { getRequestedDateDelivery } from '../../../infra/requestedDateDelivery';

type Props = {
    productItem: Product;
};

const ProductItem: React.FunctionComponent<Props> = (props: Props) => {
    const { t } = useTranslation();

    const role = localStorage.getItem('Role');
    const [productEdited, setProductEdited] = React.useState<any>();
    const [idProduct, setIdProduct] = React.useState<string>('');
    const [productIdEdit, setProductIdEdit] = React.useState<Product>();
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
    const { productItem: product } = props;
    const navigate = useNavigate();

    const showProduct = (product: Product) => {
        navigate(`${product._id}`);
    };
    const editProduct = (product: Product) => {
        setOpen(true);
        setIdProduct(product._id);
        setProductIdEdit(product);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = () => {
        setOpen(false);
        const productEdit = {
            Name: nameForm,
            BrandId: brandForm,
            CategoryId: categoryForm,
            GiaTien: giaTienForm,
            KichThuocHat: kichThuocHatForm,
            NoiSanXuat: noiSanXuatForm,
            SoLuong: soLuongForm,
            TrongLuongBao: trongLuongBaoForm,
        };
        axios
            .put('http://localhost:4000/editProduct/' + idProduct, {
                Name: nameForm,
                BrandId: brandForm,
                CategoryId: categoryForm,
                GiaTien: giaTienForm,
                KichThuocHat: kichThuocHatForm,
                NoiSanXuat: noiSanXuatForm,
                SoLuong: soLuongForm,
                TrongLuongBao: trongLuongBaoForm,
            })
            .then((res: any) => {
                setProductEdited(productEdit);
            });
        const newObject = {
            ...productEdit,
            idProduct: idProduct,
        };

        window.location.reload();
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
        <Box
            width="17%"
            height="25rem"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
        >
            <StyledButton
                onClick={() => {
                    showProduct(product);
                }}
            >
                <Image src={product.Image} height="10rem" width="100%" />
                <Typography
                    variant="body1"
                    width="80%"
                    color="common.black"
                    lineHeight="1rem"
                    minHeight="2rem"
                    paddingBottom="2%"
                >
                    {product.Name}
                </Typography>

                <Typography width="80%" paddingBottom="1rem" color="grey.300" noWrap={true} variant="body2">
                    {t('product.pellet_size')}: {product.Description}
                </Typography>
            </StyledButton>

            <Box display="flex" flexDirection="row" height="12%" width="100%" columnGap="2%">
                {role === 'user' && (
                    <StyledGenericButton
                        color="primary"
                        width="100%"
                        textTransform={TextTransform.Uppercase}
                        content={'Xem'}
                        backgroundColor={theme.palette.secondary.main}
                        hoverColor={theme.palette.common.white}
                        onClick={() => {
                            console.log('chay vao ham nay');
                            showProduct(product);
                        }}
                    />
                )}
                {role != 'user' && (
                    <Box>
                        <StyledGenericButton
                            color="primary"
                            width="100%"
                            textTransform={TextTransform.Uppercase}
                            content={'Sửa thông tin'}
                            backgroundColor={theme.palette.secondary.main}
                            hoverColor={theme.palette.common.white}
                            onClick={() => {
                                editProduct(product);
                            }}
                        />
                        <StyledGenericButton
                            color="primary"
                            width="100%"
                            textTransform={TextTransform.Uppercase}
                            content={'Truy suất thông tin'}
                            backgroundColor={theme.palette.secondary.main}
                            hoverColor={theme.palette.common.white}
                        />
                    </Box>
                )}
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Sửa sản phẩm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Vui lòng nhập những thông tin sản phẩm bạn muốn sửa. Sau đó nhấn Xác nhận để hoàn tất quá trình
                        sửa sản phẩm.
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
                        defaultValue={productIdEdit?.Name}
                    />
                    <br></br>
                    <br></br>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={productIdEdit?.BrandId}
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
                        defaultValue={productIdEdit?.CategoryId}
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
                        defaultValue={productIdEdit?.Description}
                    />

                    <TextField
                        onChange={onChangeGiaTien}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Giá Tiền"
                        fullWidth
                        variant="standard"
                        defaultValue={productIdEdit?.GiaTien}
                    />
                    <TextField
                        onChange={onChangeKichThuocHat}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Kích thước"
                        fullWidth
                        variant="standard"
                        defaultValue={productIdEdit?.KichThuocHat}
                    />
                    <TextField
                        onChange={onChangeNoiSanXuat}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nơi Sản Xuất"
                        fullWidth
                        variant="standard"
                        defaultValue={productIdEdit?.NoiSanXuat}
                    />
                    <TextField
                        onChange={onChangeSoLuong}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Số Lượng"
                        fullWidth
                        variant="standard"
                        defaultValue={productIdEdit?.SoLuong}
                    />
                    <TextField
                        onChange={onChangeTrongLuongBao}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Trọng Lượng Bao"
                        fullWidth
                        variant="standard"
                        defaultValue={productIdEdit?.TrongLuongBao}
                    />
                </DialogContent>
                <DialogActions>
                    <MuiButton onClick={handleClose}>Đóng</MuiButton>
                    <MuiButton onClick={handleEdit}>Sửa</MuiButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProductItem;

const StyledButton = styled(MuiButton)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${theme.palette.common.white};
    width: 100%;
    text-transform: none;
    &:hover {
        background-color: ${theme.palette.common.white};
    }
    & > p {
        & > p {
            color: ${theme.palette.primary.main};
        }
    }
`;
const StyledGenericButton = styled(Button)`
    padding: 0;
    &:hover {
        padding: 0;
    }
`;
