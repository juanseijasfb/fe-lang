import { useParams } from "react-router";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { Button } from "@mui/base";
import { Box } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
	addTag,
	getLabel,
	getLabels,
	getTags,
	getTagsList,
	loadTranslations,
	removeTag,
} from "@/services/ApiServices";
import { Language } from "@/utils/constants";
import { Label } from "@mui/icons-material";

export default function LanguageForm() {
	const [loading, setLoading] = useState(true);
	const [json, setJson] = useState({});
	const { language } = useParams();

	useEffect(() => {
		(async () => {
			setLoading(true);
			const tags = await getTags();
			// @ts-ignore
			const labels = await getLabels(Language[language?.toUpperCase()]);

			const data = {};

			// biome-ignore lint/complexity/noForEach: <explanation>
			tags.forEach((tag) => {
				if (!labels.success[tag]) data[tag] = "";
				else data[tag] = labels.success[tag];

				// if (!data[tag]) data[tag] = "";
				// else data[tag] = labels.success[tag];
			});

			setJson(data);
			setLoading(false);
		})();
	}, [language]);

	const save = async () => {
		const oldKeys = await getTags();
		const keys = Object.keys(json);
		// array con los keys que se borraron
		const tagsToDelete = oldKeys.filter((tag) => {
			return !keys.includes(tag);
		});

		await Promise.all(
			tagsToDelete.map(async (tag) => {
				await removeTag(tag);
			}),
		);
		const data = await getTagsList(keys);
		const tagsToCreate = data
			.map((tag, index) => {
				if (Object.keys(tag).length === 0) return index;
			})
			.filter((tag) => tag !== undefined);

		await Promise.all(
			tagsToCreate.map(async (index) => {
				const tag = keys[index];
				console.log(tag);
				await addTag(tag);
			}),
		);
		// @ts-ignore
		await loadTranslations(Language[language?.toUpperCase()], json);
	};

	return (
		<div>
			<Typography
				sx={{
					textAlign: "center",
					marginBottom: "20px",
					marginTop: "20px",
					fontSize: "32px",
				}}
			>
				{language === "en" ? "English" : "Spanish"}
			</Typography>
			{!loading && (
				<JSONInput
					id="a_unique_id"
					placeholder={json}
					locale={locale}
					height="550px"
					width="100%"
					onChange={(e) => {
						const text = e.jsObject;
						setJson(text);
					}}
				/>
			)}
			{loading && (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						marginTop: "10px",
						height: "550px",
					}}
				>
					<CircularProgress />
				</Box>
			)}
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					marginTop: "10px",
				}}
			>
				<Button onClick={() => save()}>Guardar Json</Button>
			</Box>
		</div>
	);
}
