import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

export default class UserAvatarControllers {
	public async update(req: Request, res: Response): Promise<Response> {
		const updateUserAvatar = container.resolve(UpdateUserAvatarService);

		const fileName = req.file?.filename || '';

		const user = await updateUserAvatar.execute({
			avatarFilename: fileName,
			user_id: req.user.id,
		});

		return res.json(classToClass(user));
	}
}
