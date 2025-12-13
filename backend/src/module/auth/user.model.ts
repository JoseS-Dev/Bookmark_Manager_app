import {prisma} from '../../../config/prisma.client.ts';
import type { UserDataCreate, UserDataUpdate, UserStadistics } from '../../interfaces/auth/user.interface.ts';
import { selectAllWithoutTimestamps } from '../../core/utils/function.utils.ts';
import bcryptjs from 'bcryptjs';

// Modelo que interactua con la tabla de users en la base de datos
export class ModelUser {
    // Método para registrar un nuevo usuario
    createUser = async (data: UserDataCreate) => {
        if(!data) return {error: "Los datos no fueron proporcionados"};
        const {email_user, username_user, ...rest} = data;
        // Se verifica si ya existen un usuario con ese email o username
        const existingUser = await prisma.users.findUnique({
            where: {
                email_user,
                OR: [{username_user}]
            }
        });
        if(existingUser) return {error: "El usuario ya existe"}
        // Si no existe se procede a registrar el nuevo usuario
        const newUser = await prisma.users.create({
            data: {
                ...data,
                password_user: await bcryptjs.hash(rest.password_user, 10)
            },
            select: selectAllWithoutTimestamps(prisma.users)
        });
        if(!newUser) return {error: "Error al crear el usuario"};
        return {
            user: newUser,
            message: "Usuario creado exitosamente"
        }
    }

    // Método para obtener los datos de un usuario por su ID
    getUserById = async (userId: number) => {
        if(!userId) return {error: "No se proporcionó un ID de usuario"};
        // Se obtienen los datos del usuario
        const user = await prisma.users.findUnique({
            where: {id: userId},
            select: selectAllWithoutTimestamps(prisma.users)
        });
        if(!user) return {error: "Usuario no encontrado"};
        return {
            message: "Usuario encontrado",
            user: user
        }
    };

    // Método para loguear un usuario por su email y contraseña
    LoginUser = async (email_user: string, password_user: string) => {
        if(!email_user || !password_user) return {error: "Email o contraseña no proporcionados"};
        // Se verifica si existe un usuario con es email
        const existingEmail = await prisma.users.findFirst({
            where: {email_user: email_user},
            select: {
                id: true,
                email_user: true,
                password_user: true,
                username_user: true
            }
        });
        if(!existingEmail) return {error: "Email o contraseña incorrectos"};
        // Si existe, se verifica la contraseña
        const isPasswordValid = await bcryptjs.compare(password_user, existingEmail.password_user);
        if(isPasswordValid){
            // Si la contraseña es valida, se verifca si el usuario ya habia loguadno antes
            const session = await prisma.session.findFirst({
                where: {user_id: existingEmail.id}
            });
            if(session){
                // Si ya habia logueado antes, se actualiza la fecha de logueo
                const updatedSession = await prisma.session.update({
                    where: {id: session.id},
                    data: {
                        looged_in_at: new Date(),
                        is_active: true
                    }
                });
                if(!updatedSession) return {error: "Error al actualizar la sesión"};
                return {
                    message: "Inicio de sesión exitoso",
                    userId: existingEmail
                }
            }
            // Si no habia logueado antes, se crea una nueva sesión
            const newSession = await prisma.session.create({
                data: { user_id: existingEmail.id }
            });
            if(!newSession) return {error: "Error al crear la sesión"};
            return {
                message: "Inicio de sesión exitoso",
                user: existingEmail
            }
        }
        return {error: "Email o contraseña incorrectos :)"};
    }

    // Método para desloguear un usuario por su ID
    LogoutUser = async (userId: number) => {
        if(!userId) return {error: "No se proporcionó un ID de usuario"};
        // Se verifica si existe una sesión activa para el usuario
        const session = await prisma.session.findFirst({
            where: {user_id: userId, is_active: true}
        });
        if(!session) return {error: "No hay una sesión activa para este usuario"};
        // Si existe, se actualiza la sesión para marcarla como inactiva
        const updatedSession = await prisma.session.update({
            where: {id: session.id},
            data: {
                is_active: false,
                looged_out_at: new Date()
            }
        });
        if(!updatedSession) return {error: "Error al actualizar la sesión"};
        return {
            message: "Cierre de sesión exitoso"
        }
    }

    // Método para actualizar los datos de un usuario por su ID
    updateUser = async (userId: number, data: Partial<UserDataUpdate>) => {
        if(!userId || !data) return {error: "No se proporcionó un ID de usuario o datos para actualizar"};
        // Se verifica si existe el usuario
        const existingUser = await prisma.users.findUnique({
            where: {id: userId}
        });
        if(!existingUser) return {error: "Usuario no encontrado"};
        // Si existe, se actualizan los datos del usuario
        const updatedUser = await prisma.users.update({
            where: {id: userId},
            data: {
                ...data,
                updated_at: new Date()
            },
            select: selectAllWithoutTimestamps(prisma.users)
        });
        if(!updatedUser) return {error: "Error al actualizar el usuario"};
        return {
            message: "Usuario actualizado exitosamente",
            user: updatedUser
        }
    }

    // Método para eliminar un usuario por su ID
    deleteUser = async (userId: number) => {
        if(!userId) return {error: "No se proporcionó un ID de usuario"};
        // Se verifica si existe el usuario
        const existingUser = await prisma.users.findUnique({
            where: {id: userId}
        });
        if(!existingUser) return {error: "Usuario no encontrado"};
        // Si existe, se elimina el usuario
        const deletedUser = await prisma.users.delete({
            where: {id: userId}
        });
        if(!deletedUser) return {error: "Error al eliminar el usuario"};
        return {
            message: "Usuario eliminado exitosamente"
        }
    }
    // Método apra obtener las estadisticas de usuarios
    getUserStatistics = async (userId: number) => {
        if(!userId) return {error: "No se proporcionó un ID de usuario"};
        // Se verifica si existe el usuario
        const existingUser = await prisma.users.findUnique({
            where: {id: userId}
        });
        if(!existingUser) return {error: "Usuario no encontrado"};
        // Si existe, se obtienen las estadisticas del usuario
        const userStadistics = await prisma.user_stats.findFirst({
            where: {user_id: userId}
        });
        if(!userStadistics) return {error: "Error al obtener las estadísticas del usuario"};
        return {
            message: "Estadísticas del usuario obtenidas exitosamente",
            statistics: userStadistics
        }
    }

    // Método para crear las estadísticas de un usuario
    createUserStatistics = async (userId: number) => {
        if(!userId) return {error: "No se proporcionó un ID de usuario"};
        // Se verifica si existe el usuario
        const existingUser = await prisma.users.findUnique({
            where: {id: userId}
        });
        if(!existingUser) return {error: "Usuario no encontrado"};
        // Si existe, se obtienen todos, los bookmarks, colecciones, likes y comentarios del usuario
        const newStatistics = await prisma.$transaction(async (tsx) => {
            // Priemro obtenemos todos los colecciones del usuario
            const totalCollections = await tsx.collection.count({
                where: {user_id: userId}
            });
            const userCollections = await tsx.collection.findMany({
                where: {user_id: userId},
                select: {id: true}
            });
            // Luego obtenemos todos los bookmarks del usuario de esa colecciones
            const collectionIds = userCollections.map(col => col.id);
            // Obtener todos los bookmarks del usuario (de sus colecciones)
            const totalBookmarks = await tsx.bookmark.count({
                where: { 
                    collection_id: { 
                        in: collectionIds.length > 0 ? collectionIds : []
                    }
                }
            });
            // Luego obtenemos todos los likes dados por el usuario
            const totalLikesGiven = await tsx.like_bookmark.count({
                where: {user_id: userId}
            });
            // Finalmente obtenemos todos los comentarios hechos por el usuario
            const totalCommentsMade = await tsx.comment_bookmark.count({
                where: {user_id: userId}
            });
            // Una vez que hemos obtenido todos los datos, procedemos a crear las estadísticas del usuario
            const statistics = await tsx.user_stats.create({
                data: {
                    user_id: userId,
                    total_bookmarks: totalBookmarks,
                    total_collections: totalCollections,
                    total_likes_given: totalLikesGiven,
                    total_comments_made: totalCommentsMade
                }
            })
            return {message: "Estadísticas del usuario creadas exitosamente", statistics}
        });
        if(!newStatistics) return {error: "Error al crear las estadísticas del usuario"};
        return {
            message: newStatistics.message,
            statistics: newStatistics.statistics
        }
    }

    // Método para actualizar las estadísticas de un usuario por su ID
    updateUserStatistics = async (userId: number) => {
        if(!userId) return {error: "No se proporcionó un ID de usuario o datos para actualizar"};
        // Se verifica si existe el usuario
        const existingUser = await prisma.users.findUnique({
            where: {id: userId}
        });
        if(!existingUser) return {error: "Usuario no encontrado"};
        // Si existe, se obtienen todos, los bookmarks, colecciones, likes y comentarios del usuario
        const newStatistics = await prisma.$transaction(async (tsx) => {
            // Priemro obtenemos todos los colecciones del usuario
            const totalCollections = await tsx.collection.count({
                where: {user_id: userId}
            });
            const userCollections = await tsx.collection.findMany({
                where: {user_id: userId},
                select: {id: true}
            });
            // Luego obtenemos todos los bookmarks del usuario de esa colecciones
            const collectionIds = userCollections.map(col => col.id);
            // Obtener todos los bookmarks del usuario (de sus colecciones)
            const totalBookmarks = await tsx.bookmark.count({
                where: { 
                    collection_id: { 
                        in: collectionIds.length > 0 ? collectionIds : []
                    }
                }
            });
            // Luego obtenemos todos los likes dados por el usuario
            const totalLikesGiven = await tsx.like_bookmark.count({
                where: {user_id: userId}
            });
            // Finalmente obtenemos todos los comentarios hechos por el usuario
            const totalCommentsMade = await tsx.comment_bookmark.count({
                where: {user_id: userId}
            });
            const existingStatistics = await tsx.user_stats.findFirst({
                where: {user_id: userId}
            });
            // Una vez que hemos obtenido todos los datos, procedemos a crear las estadísticas del usuario
            const statistics = await tsx.user_stats.update({
                where: {id: existingStatistics ? existingStatistics.id : 0},
                data: {
                    total_bookmarks: totalBookmarks,
                    total_collections: totalCollections,
                    total_likes_given: totalLikesGiven,
                    total_comments_made: totalCommentsMade
                }
            })
            return {message: "Estadísticas del usuario creadas exitosamente", statistics}
        });
        if(!newStatistics) return {error: "Error al actualizar las estadísticas del usuario"};
        return {
            message: newStatistics.message,
            statistics: newStatistics.statistics
        }
    }
}