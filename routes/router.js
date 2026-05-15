import ListFilesController from '../app/Controllers/ListFilesController.js';
import GetFileController from '../app/Controllers/GetFileController.js';
import Return404Controller from '../app/Controllers/Return404Controller.js';
import EnvironmentController from '../app/Controllers/EnvironmentController.js';
import userRouter from './apis/userRouter.js';
import addressRouter from './apis/addressRouter.js';

const router = Router();

router.use(express.json());

router.get("/arquivo", GetFileController);
router.get('/ambiente', EnvironmentController);
router.get('/arquivo', GetFileController);

// Rota para listar arquivos na pasta 'public'
router.get('/', ListFilesController);