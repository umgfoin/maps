/**
 * @copyright Copyright (c) 2019, Paul Schwörer <hello@paulschwoerer.de>
 *
 * @author Paul Schwörer <hello@paulschwoerer.de>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { generateUrl } from '@nextcloud/router'
import { showInfo } from '@nextcloud/dialogs'
import axios from '@nextcloud/axios'

export const getPublicShareCategory = () => {
	const el = document.querySelector('.header-appname')

	if (!el) {
		throw new Error('Could not get public share category')
	}

	return el.textContent
}

export const isPublicShare = () => {
	return document.body.id === 'body-public'
}

export const getCurrentPublicShareToken = () => {
	// FIXME: there must be a better way to retrieve the token client side
	const path = location.pathname.split('/')

	return path[path.length - 1]
}

export const publicApiRequest = (slug, method, data = null) => {
	return request(
		generateUrl(
			`/apps/maps/api/1.0/public/${getCurrentPublicShareToken()}/${slug}`
		),
		method,
		data
	)
}

export const apiRequest = (slug, method, data = null) => {
	return request(
		generateUrl(`apps/maps/api/1.0/${getCurrentPublicShareToken()}/${slug}`),
		method,
		data
	)
}

// TODO: Use axios or similar instead of jQuery ajax
export const request = (url, method, data = null) => {
	const upMethod = method.toUpperCase()
	if (upMethod === 'GET') {
		return axios.get(url, { params: data })
	} else if (upMethod === 'POST') {
		return axios.post(url, data)
	} else if (upMethod === 'PUT') {
		return axios.put(url, data)
	} else if (upMethod === 'DELETE') {
		return axios.delete(url, data)
	}
}

export const showNotification = message => {
	showInfo(t('maps', message))
}
